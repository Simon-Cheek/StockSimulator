import { cookies } from "next/headers";
import { UserData } from "../page";
import { redirect } from "next/navigation";
import Sell from "./sell";

export default async function SellPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("stockSimUser");
  const apiKey = cookieStore.get("stockSimKey")?.value;
  const userID = user?.value;

  if (!userID) {
    return redirect("/login");
  }

  const res = await fetch(`https://stock.simoncheek.com/api/user/${userID}`, {
    headers: {
      Cookie: `stockSimKey=${apiKey}`,
    },
  });
  if (!res.ok) {
    return redirect("/login");
  }

  const data = await res.json();
  const userData: UserData = JSON.parse(data.userData || "{}");

  return <Sell data={userData} userID={userID} />;
}
