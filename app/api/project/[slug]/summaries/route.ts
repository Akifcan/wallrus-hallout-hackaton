import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

async function getSummaries(projectId: number) {
  const summaries = await supabase
    .from("summary")
    .select("*")
    .eq("project_id", projectId);

  if (!summaries.data || summaries.data.length === 0) {
    return [];
  }

  // Fetch content from Walrus for each summary
  const summariesWithContent = await Promise.all(
    summaries.data.map(async (summary) => {
      try {
        const response = await axios.get(
          `https://aggregator.walrus-testnet.walrus.space/v1/${summary.blob_id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        return {
          ...summary,
          content: response.data,
        };
      } catch (error) {
        console.error(`Error fetching blob ${summary.blob_id}:`, error);
        return {
          ...summary,
          content: null,
          error: "Failed to fetch content",
        };
      }
    })
  );

  return summariesWithContent;
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

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const summaries = await getSummaries(project.data.id);

  return NextResponse.json({
    summaries,
  });
}
