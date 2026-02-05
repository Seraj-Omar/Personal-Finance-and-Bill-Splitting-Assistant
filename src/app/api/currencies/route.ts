import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.BASE_URL;
  if (!base) {
    return NextResponse.json(
      { success: false, message: "Missing BASE_URL" },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization") ?? "";

  const upstream = await fetch(`${base}/currencies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(auth ? { Authorization: auth } : {}),
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

  return NextResponse.json(data, { status: upstream.status });
}
