import generateInstruction from "@/lib/instruction";
import { summarySchema } from "@/lib/schemas";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await summarySchema.validate(body, {
      abortEarly: false,
    });

    const client = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });

    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: generateInstruction(validatedData),
      input: validatedData.content,
    });

    return NextResponse.json({
      summary: response.output_text,
    });
  } catch (e) {
    console.error("Summary error:", e);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
