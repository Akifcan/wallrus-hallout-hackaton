import { searchSchema } from "@/lib/schemas";
import search from "@/lib/search";
import upload from "@/lib/upload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await searchSchema.validate(body, {
      abortEarly: false,
    });
    const { site, keyword } = validatedData;
    const searchKeyword = encodeURIComponent(`site:${site} "${keyword}"`);
    const result = await search(searchKeyword);

    // Convert result to JSON string and then to Buffer
    const jsonString = JSON.stringify(result, null, 2);
    const buffer = Buffer.from(jsonString, "utf-8");

    // Upload JSON file to Walrus
    const blobId = await upload(buffer, "application/json");

    if (!blobId) {
      throw new Error("Failed to upload results to Walrus");
    }

    return NextResponse.json({
      blobId,
      results: result,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
