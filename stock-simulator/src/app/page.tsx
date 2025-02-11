import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Home from "./home";

export interface UserData {
  apiKey: string;
  password: string;
  balance: string;
  stocks: Record<string, string>;
}

export interface PageProps {
  data: UserData;
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("stockSimUser");
  const apiKey = cookieStore.get("stockSimKey")?.value;
  const userID = user?.value;

  if (!userID) {
    return redirect("/login");
  }

  const res = await fetch(`https://stock.simoncheek.com/api/users/${userID}`, {
    headers: {
      Cookie: `stockSimKey=${apiKey}`,
    },
  });
  if (!res.ok) {
    return redirect("/login");
  }

  const data = await res.json();
  const userData: UserData = JSON.parse(data.userData || "{}");

  return <Home data={userData} />;
}
