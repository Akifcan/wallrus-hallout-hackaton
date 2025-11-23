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
    const searchKeyword = site
      ? encodeURIComponent(`site:${site} "${keyword}"`)
      : encodeURIComponent(`"${keyword}"`);
    const result = await search(searchKeyword);

    return NextResponse.json({
      success: true,
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
