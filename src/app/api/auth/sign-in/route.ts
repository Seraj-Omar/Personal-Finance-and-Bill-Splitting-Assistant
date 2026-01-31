import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const url = `${process.env.baseUrl}/api/auth/sign-in`

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.log("FETCH ERROR:", error) 
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    )
  }
}
