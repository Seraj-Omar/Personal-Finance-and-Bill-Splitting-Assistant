import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const base = process.env.BASE_URL; // https://gsg-project-group-5.vercel.app/api/v1
  if (!base) {
    return NextResponse.json({ message: "BASE_URL is missing" }, { status: 500 });
  }

  const { search } = new URL(req.url);
  const target = `${base.replace(/\/$/, "")}/auth/google/callback${search}`;
  return NextResponse.redirect(target);
}
