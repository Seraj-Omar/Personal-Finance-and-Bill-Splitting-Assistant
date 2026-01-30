import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const url = `${process.env.baseUrl}/api/auth/sign-up`

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
