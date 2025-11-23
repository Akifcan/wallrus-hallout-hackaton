import { NextResponse } from "next/server";
import axios from "axios";
import { uploadSchema } from "@/lib/schemas";
import upload from "@/lib/upload";
import supabase from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await uploadSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { url, project_id } = validatedData;

    const file = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const contentType =
      file.headers["content-type"] || "application/octet-stream";

    const blobId = await upload(file.data, contentType);
    if (!blobId) {
      throw new Error("BlobId not found in Walrus response");
    }

    // Save to database
    const { data, error } = await supabase
      .from("file_research")
      .insert([
        {
          wallet,
          blob_id: blobId,
          project_id,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save file research" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blobId,
      fileResearch: data[0],
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to upload to Walrus" },
      { status: 500 }
    );
  }
}
