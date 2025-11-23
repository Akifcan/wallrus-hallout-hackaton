import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: project, error } = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", "true")
    .single();

  if (error || !project) {
    return NextResponse.json(
      { error: "Publication not found or not public" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    publication: project,
  });
}
