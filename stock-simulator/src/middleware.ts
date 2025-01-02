import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./functions/authenticate";
import * as cookie from "cookie";

export default async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const apiKey = cookies?.stockSimKey || "";
  const userID = cookies?.stockSimUser || "";
  const { pathname } = req.nextUrl;

  // Allow login page and static assets
  if (pathname.startsWith("/login") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  // Authenticate User
  try {
    console.error("MIddleware running!");
    console.error("USERID: ", userID);
    console.error("apiKEY", apiKey);
    if (!apiKey || !userID) {
      throw Error("Missing auth information");
    }
    const auth = await authenticateUser(userID, apiKey);
    console.log("AUTH: ", auth);
    if (!auth) {
      throw Error("Unauthorized");
    }
  } catch {
    // Redirect
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    console.log("Redirecting?");
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
