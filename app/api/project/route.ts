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

async function getWordResearch(projectId: number) {
  const wordResearch = await supabase
    .from("word_research")
    .select("*")
    .eq("project_id", projectId);

  if (!wordResearch.data || wordResearch.data.length === 0) {
    return [];
  }

  // Fetch content from Walrus for each word research
  const wordResearchWithContent = await Promise.all(
    wordResearch.data.map(async (research) => {
      try {
        const response = await axios.get(
          `https://aggregator.walrus-testnet.walrus.space/v1/${research.blob_id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        return {
          ...research,
          content: response.data,
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

export async function GET() {
  const projectSlug = "xcvxvc";

  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", projectSlug)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const [notes, summaries, wordResearch] = await Promise.all([
    getNotes(project.data.id),
    getSummaries(project.data.id),
    getWordResearch(project.data.id),
  ]);

  return NextResponse.json({
    project: project.data,
    notes,
    summaries,
    wordResearch,
  });
}
