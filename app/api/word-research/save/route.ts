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

    const { results, project_id } = validatedData;

    // Convert results to JSON string and then to Buffer
    const jsonString = JSON.stringify(results, null, 2);
    const buffer = Buffer.from(jsonString, "utf-8");

    // Upload JSON file to Walrus
    const blobId = await upload(buffer, "application/json");

    if (!blobId) {
      throw new Error("Failed to upload results to Walrus");
    }

    // Save to database
    const { data, error } = await supabase
      .from("word_research")
      .insert([{ wallet, blob_id: blobId, project_id }])
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
