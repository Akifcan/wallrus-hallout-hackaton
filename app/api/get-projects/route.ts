import { NextResponse } from "next/server";
import supabase from "@/lib/db";

export async function GET(request: Request) {
  try {
    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("wallet", wallet)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      projects: data,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
