import { cookies } from "next/headers";
import { UserData } from "../page";
import { redirect } from "next/navigation";
import Sell from "./sell";

export default async function SellPage() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("stockSimUser");

  if (!userID) {
    return redirect("/login");
  }

  const res = await fetch(`/api/user/${userID}`);
  if (!res.ok) {
    return redirect("/login");
  }

  const data = await res.json();
  const userData: UserData = data.userData;

  return <Sell data={userData} />;
}
