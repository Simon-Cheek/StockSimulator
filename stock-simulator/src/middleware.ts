import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./functions/authenticate";

export async function middleware(req: NextRequest) {
  const apiKey = req.cookies.get("stockSimKey")?.value || "";
  const userID = req.cookies.get("stockSimUser")?.value || "";
  const { pathname } = req.nextUrl;

  // Allow login page and static assets
  if (pathname.startsWith("/login") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  // Authenticate User
  try {
    if (!apiKey || !userID) {
      throw Error("Missing auth information");
    }
    const auth = await authenticateUser(userID, apiKey);
    if (!auth) {
      throw Error("Unauthorized");
    }
  } catch {
    // Redirect
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
