import generateInstruction from "@/lib/instruction";
import { summarySchema } from "@/lib/schemas";
import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await summarySchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });

    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: generateInstruction(validatedData),
      input: validatedData.content,
    });

    // Save to database
    const { data, error } = await supabase
      .from("summary")
      .insert([{ result: response.output_text, wallet }])
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
      summary: response.output_text,
      summaryId: data[0].id,
    });
  } catch (e) {
    console.error("Summary error:", e);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
