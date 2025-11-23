import { NextResponse } from "next/server";
import { projectSchema } from "@/lib/schemas";
import supabase from "@/lib/db";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = await projectSchema.validate(body, {
      abortEarly: false,
    });

    const wallet = request.headers.get("x-wallet-address");

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 401 }
      );
    }

    const { projectName } = validatedData;

    const { data, error } = await supabase
      .from("project")
      .insert([{ title: projectName, wallet, slug: slugify(projectName) }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: data[0],
    });
  } catch (error) {
    console.error("Create folder error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
