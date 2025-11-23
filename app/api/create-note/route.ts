import { NextResponse } from "next/server";
import { noteSchema } from "@/lib/schemas";
import supabase from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await noteSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { title, content, project_id } = validatedData;

    const { data, error } = await supabase
      .from("note")
      .insert([{ title, content, project_id, wallet }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create note" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      note: data[0],
    });
  } catch (error) {
    console.error("Create note error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
