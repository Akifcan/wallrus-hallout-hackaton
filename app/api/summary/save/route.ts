import { saveSummarySchema } from "@/lib/schemas";
import supabase from "@/lib/db";
import upload from "@/lib/upload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await saveSummarySchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { summary_id, project_id } = validatedData;

    // Get summary from database
    const { data: summaryData, error: fetchError } = await supabase
      .from("summary")
      .select("result")
      .eq("id", summary_id)
      .eq("wallet", wallet)
      .single();

    if (fetchError || !summaryData) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: "Summary not found" },
        { status: 404 }
      );
    }

    // Create JSON object to upload to Walrus
    const summaryObject = {
      result: summaryData.result,
      created_at: new Date().toISOString(),
    };

    // Convert to JSON string and then to Buffer
    const jsonString = JSON.stringify(summaryObject, null, 2);
    const buffer = Buffer.from(jsonString, "utf-8");

    // Upload JSON file to Walrus
    const blobId = await upload(buffer, "application/json");

    if (!blobId) {
      throw new Error("Failed to upload summary to Walrus");
    }

    // Update summary with blob_id and project_id
    const { data, error } = await supabase
      .from("summary")
      .update({ blob_id: blobId, project_id })
      .eq("id", summary_id)
      .eq("wallet", wallet)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blobId,
      summary: data[0],
    });
  } catch (error) {
    console.error("Save summary error:", error);
    return NextResponse.json(
      { error: "Failed to save summary" },
      { status: 500 }
    );
  }
}
