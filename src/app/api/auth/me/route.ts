import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL; // مثال: https://gsg-project-group-5.vercel.app/api/v1
  if (!base) return NextResponse.json({ message: "Missing BACKEND_URL" }, { status: 500 });

  const cookie = req.headers.get("cookie") ?? "";
  const auth = req.headers.get("authorization") ?? ""; // اخ

  const upstream = await fetch(`${base}/auth/me`, {
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(auth ? { authorization: auth } : {}),
      accept: "application/json",
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
