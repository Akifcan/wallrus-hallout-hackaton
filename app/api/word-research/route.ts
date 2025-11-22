import { searchSchema } from "@/lib/schemas";
import search from "@/lib/search";
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
    return NextResponse.json(result);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
