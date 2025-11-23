import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const wallet = request.headers.get("x-wallet-address");

  if (!wallet) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 401 });
  }

  const project = await supabase
    .from("project")
    .select("*")
    .eq("slug", slug)
    .eq("wallet", wallet)
    .single();

  if (!project.data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    project: project.data,
  });
}
