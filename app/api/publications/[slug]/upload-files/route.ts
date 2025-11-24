import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Get the public project by slug
  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Publication not found" }, { status: 404 });
  }

  // Get upload files for this project - only blob_id and mime_type
  const { data: files, error } = await supabase
    .from("file_research")
    .select("id, blob_id, mime_type, created_at")
    .eq("project_id", project.data.id)
    .not("blob_id", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    files: files || [],
  });
}
