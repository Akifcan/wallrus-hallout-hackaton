import { saveWordResearchSchema } from "@/lib/schemas";
import supabase from "@/lib/db";
import upload from "@/lib/upload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await saveWordResearchSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { word_research_id, project_id } = validatedData;

    // Get word research from database
    const { data: researchData, error: fetchError } = await supabase
      .from("word_research")
      .select("results")
      .eq("id", word_research_id)
      .eq("wallet", wallet)
      .single();

    if (fetchError || !researchData) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: "Word research not found" },
        { status: 404 }
      );
    }

    // Parse results from JSON string
    const results = JSON.parse(researchData.results);

    // Create JSON object to upload to Walrus
    const researchObject = {
      results,
      created_at: new Date().toISOString(),
    };

    // Convert to JSON string and then to Buffer
    const jsonString = JSON.stringify(researchObject, null, 2);
    const buffer = Buffer.from(jsonString, "utf-8");

    // Upload JSON file to Walrus
    const blobId = await upload(buffer, "application/json");

    if (!blobId) {
      throw new Error("Failed to upload results to Walrus");
    }

    // Update word research with blob_id and project_id
    const { data, error } = await supabase
      .from("word_research")
      .update({ blob_id: blobId, project_id })
      .eq("id", word_research_id)
      .eq("wallet", wallet)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save word research" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blobId,
      wordResearch: data[0],
    });
  } catch (error) {
    console.error("Save word research error:", error);
    return NextResponse.json(
      { error: "Failed to save word research" },
      { status: 500 }
    );
  }
}
