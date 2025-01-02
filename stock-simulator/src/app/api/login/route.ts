import { fetchUser, UserInterface } from "@/functions/authenticate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userID, password } = await req.json();
  try {
    const user: UserInterface | null = await fetchUser(userID);
    const parsedData = await JSON.parse(user?.userData || "");
    if (
      parsedData &&
      parsedData?.password &&
      parsedData.password == password &&
      parsedData?.apiKey
    ) {
      const res = NextResponse.json({
        message: "User authenticated",
      });
      res.cookies.set("stockSimKey", parsedData?.apiKey, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.cookies.set("stockSimUser", userID, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      return res;
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (e) {
    console.error("Error authenticating user: ", e);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
