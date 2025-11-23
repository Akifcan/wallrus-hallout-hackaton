import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

async function getWordResearch(projectId: number) {
  const wordResearch = await supabase
    .from("word_research")
    .select("*")
    .eq("project_id", projectId)
    .not("blob_id", "is", null);

  if (!wordResearch.data || wordResearch.data.length === 0) {
    return [];
  }

  // Fetch content from Walrus for each word research
  const wordResearchWithContent = await Promise.all(
    wordResearch.data.map(async (research) => {
      try {
        const response = await axios.get(
          `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${research.blob_id}`,
          {
            responseType: "arraybuffer",
          }
        );

        // Convert buffer to string and parse JSON
        const jsonString = Buffer.from(response.data).toString("utf-8");
        const content = JSON.parse(jsonString);

        return {
          content: content.results,
        };
      } catch (error) {
        console.error(`Error fetching blob ${research.blob_id}:`, error);
        return {
          ...research,
          content: null,
          error: "Failed to fetch content",
        };
      }
    })
  );

  return wordResearchWithContent;
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

  const wordResearch = await getWordResearch(project.data.id);

  return NextResponse.json({
    wordResearch,
  });
}
