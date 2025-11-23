import { NextResponse } from "next/server";
import { noteSchema } from "@/lib/schemas";
import supabase from "@/lib/db";
import upload from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await noteSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { title, content, project_id } = validatedData;

    // Create note object to upload to Walrus
    const noteData = {
      title,
      content,
      created_at: new Date().toISOString(),
    };

    // Convert to JSON string and then to Buffer
    const jsonString = JSON.stringify(noteData, null, 2);
    const buffer = Buffer.from(jsonString, "utf-8");

    // Upload JSON file to Walrus
    const blobId = await upload(buffer, "application/json");

    if (!blobId) {
      throw new Error("Failed to upload note to Walrus");
    }

    // Save to database with blob_id
    const { data, error } = await supabase
      .from("note")
      .insert([{ blob_id: blobId, project_id, wallet }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create note" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blobId,
      note: data[0],
    });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
