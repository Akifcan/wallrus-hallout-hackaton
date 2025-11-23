import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import * as yup from "yup";

const updateMetaSchema = yup.object().shape({
  contact_name: yup
    .string()
    .nullable()
    .max(100, "Contact name must be at most 100 characters"),
  contact_email: yup
    .string()
    .nullable()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
  contact_number: yup
    .string()
    .nullable()
    .min(10, "Contact number must be at least 10 characters")
    .max(20, "Contact number must be at most 20 characters"),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  // Validate request body
  try {
    await updateMetaSchema.validate(body, { abortEarly: false });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }

  const { contact_name, contact_email, contact_number } = body;

  // First, get the project by slug
  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Update the project meta fields
  const { data, error } = await supabase
    .from("project")
    .update({
      contact_name: contact_name || null,
      contact_email: contact_email || null,
      contact_number: contact_number || null,
    })
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
