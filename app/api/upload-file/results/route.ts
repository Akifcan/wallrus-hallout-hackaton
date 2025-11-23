import { fileSearchSchema } from "@/lib/schemas";
import search from "@/lib/search";
import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await fileSearchSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { site, type, keyword } = validatedData;
    const searchKeyword = site
      ? encodeURIComponent(`site:${site} ${keyword} filetype:"${type}"`)
      : encodeURIComponent(`${keyword} filetype:"${type}"`);
    const result = await search(searchKeyword);

    // Save results to database
    const { data, error } = await supabase
      .from("word_research")
      .insert([{ wallet, results: JSON.stringify(result) }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save search results" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      results: result,
      researchId: data[0].id,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
