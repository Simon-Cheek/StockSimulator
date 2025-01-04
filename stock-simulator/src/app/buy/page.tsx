import { cookies } from "next/headers";
import { UserData } from "../page";
import { redirect } from "next/navigation";
import Buy from "./buy";

export default async function BuyPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("stockSimUser");
  const userID = user?.value;

  if (!userID) {
    return redirect("/login");
  }

  const res = await fetch(`https://stock.simoncheek.com/api/user/${userID}`);
  if (!res.ok) {
    return redirect("/login");
  }

  const data = await res.json();
  const userData: UserData = data.userData;

  return <Buy data={userData} />;
}
