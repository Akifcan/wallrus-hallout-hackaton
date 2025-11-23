import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import axios from "axios";

async function getFileResearch(projectId: number) {
  const fileResearch = await supabase
    .from("file_research")
    .select("*")
    .eq("project_id", projectId);

  if (!fileResearch.data || fileResearch.data.length === 0) {
    return [];
  }

  // Fetch content from Walrus for each file research
  const fileResearchWithContent = await Promise.all(
    fileResearch.data.map(async (file) => {
      try {
        const response = await axios.get(
          `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${file.blob_id}`,
          {
            responseType: "arraybuffer",
          }
        );

        // Convert buffer to string and parse JSON
        const jsonString = Buffer.from(response.data).toString("utf-8");
        const content = JSON.parse(jsonString);

        return {
          ...file,
          content,
        };
      } catch (error) {
        console.error(`Error fetching blob ${file.blob_id}:`, error);
        return {
          ...file,
          content: null,
          error: "Failed to fetch content",
        };
      }
    })
  );

  return fileResearchWithContent;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const wallet = request.headers.get("x-wallet-address");

  if (!wallet) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 401 });
  }

  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .eq("wallet", wallet)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const fileResearch = await getFileResearch(project.data.id);

  return NextResponse.json({
    fileResearch,
  });
}
