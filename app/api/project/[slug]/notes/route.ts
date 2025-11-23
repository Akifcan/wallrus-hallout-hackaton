import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

async function getNotes(projectId: number) {
  const notes = await supabase
    .from("note")
    .select("*")
    .eq("project_id", projectId);

  if (!notes.data || notes.data.length === 0) {
    return [];
  }

  // Fetch content from Walrus for each note
  const notesWithContent = await Promise.all(
    notes.data.map(async (note) => {
      try {
        const response = await axios.get(
          `https://aggregator.walrus-testnet.walrus.space/v1/${note.blob_id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        return {
          ...note,
          content: response.data,
        };
      } catch (error) {
        console.error(`Error fetching blob ${note.blob_id}:`, error);
        return {
          ...note,
          content: null,
          error: "Failed to fetch content",
        };
      }
    })
  );

  return notesWithContent;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .single();

  console.log(params);

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const notes = await getNotes(project.data.id);

  return NextResponse.json({
    notes,
  });
}
