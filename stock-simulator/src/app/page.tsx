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

  return <Home data={userData} />;
}
