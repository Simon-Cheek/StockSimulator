import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({
    message: "Logged out",
  });
  res.cookies.set("stockSimKey", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });
  res.cookies.set("stockSimUser", "", {
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });
  return res;
}
