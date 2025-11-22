import { NextResponse } from "next/server";
import axios from "axios";
import { uploadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = await uploadSchema.validate(body, {
      abortEarly: false,
    });

    const { url } = validatedData;

    // Download the file from URL
    const file = await axios.get(url, {
      responseType: "arraybuffer",
    });

    // Get content type from response headers
    const contentType =
      file.headers["content-type"] || "application/octet-stream";

    // Upload to Walrus - send the buffer directly as body
    const numEpochs = 5;
    const basePublisherUrl = "https://publisher.walrus-testnet.walrus.space";

    const response = await axios.put(
      `${basePublisherUrl}/v1/blobs?epochs=${numEpochs}`,
      file.data,
      {
        headers: {
          "Content-Type": contentType,
        },
      }
    );

    console.log("Walrus response:", response.data);

    // Extract blobId from response
    const blobId = response.data?.newlyCreated?.blobObject?.blobId;

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
