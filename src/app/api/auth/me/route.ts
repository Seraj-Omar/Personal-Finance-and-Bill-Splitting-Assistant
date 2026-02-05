import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const base = process.env.BASE_URL; 

  if (!base) {
    return NextResponse.json(
      { message: "BASE_URL is missing" },
      { status: 500 }
    );
  }

  const res = await fetch(`${base}/auth/me`, {
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: {
      "content-type":
        res.headers.get("content-type") ?? "application/json",
    },
  });
}
