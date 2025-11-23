import { NextResponse } from "next/server";
import axios from "axios";
import { uploadSchema } from "@/lib/schemas";
import upload from "@/lib/upload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await uploadSchema.validate(body, {
      abortEarly: false,
    });
    const { url } = validatedData;

    const file = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const contentType =
      file.headers["content-type"] || "application/octet-stream";

    const blobId = await upload(file.data, contentType);
    if (!blobId) {
      throw new Error("BlobId not found in Walrus response");
    }

    return NextResponse.json({
      blobId,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to upload to Walrus" },
      { status: 500 }
    );
  }
}
