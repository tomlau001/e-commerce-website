import { NextResponse } from "next/server";
import { productData } from "@/app/constants/data";

export async function GET() {
  try {
    return NextResponse.json({
      message: "fetched successfully",
      productData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong " },
      { status: 500 }
    );
  }
}
