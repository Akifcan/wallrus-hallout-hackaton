import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();
  const { is_public } = body;

  if (typeof is_public !== "boolean") {
    return NextResponse.json(
      { error: "is_public must be a boolean value" },
      { status: 400 }
    );
  }

  console.log(is_public);

  // First, get the project by slug
  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Update the is_public field
  const { data, error } = await supabase
    .from("project")
    .update({ is_public })
    .eq("slug", slug)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    project: data[0],
  });
}
