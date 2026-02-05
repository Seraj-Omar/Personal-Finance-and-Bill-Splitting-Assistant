import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const base = process.env.BASE_URL; 
  if (!base) {
    return NextResponse.json({ message: "BASE_URL is missing" }, { status: 500 });
  }

  const target = `${base.replace(/\/$/, "")}/auth/google`;
  return NextResponse.redirect(target);
}
