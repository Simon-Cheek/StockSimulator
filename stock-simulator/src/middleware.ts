import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "./functions/authenticate";
import * as cookie from "cookie";

export default async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const apiKey = cookies?.stockSimKey || "";
  const userID = cookies?.stockSimUser || "";
  const { pathname } = req.nextUrl;

  const clientAuthRoutes = ["/", "/buy", "/sell"];

  // Allow login page and static assets
  if (!clientAuthRoutes.includes(pathname)) {
    console.error("Not checking pathname: ", pathname);
    return NextResponse.next();
  }
  // Authenticate User
  try {
    console.error("UserID | apiKey | pathname");
    console.error(userID, apiKey, pathname);
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
