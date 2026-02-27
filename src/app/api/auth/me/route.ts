import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL; // https://.../api/v1
  if (!base) return NextResponse.json({ message: "Missing BASE_URL" }, { status: 500 });

  const auth = req.headers.get("authorization") ?? ""; // Bearer token

  const upstream = await fetch(`${base}/auth/me`, {
    headers: {
      ...(auth ? { authorization: auth } : {}),
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
