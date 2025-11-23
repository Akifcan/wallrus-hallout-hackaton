import { NextResponse } from "next/server";
import supabase from "@/lib/db";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("project")
      .select("title, wallet, slug, contact_name, contact_email, contact_number, is_public")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch publications" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      publications: data,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Get publications error:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}
