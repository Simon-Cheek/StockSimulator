import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./global.css";
import Header from "./header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserData } from "./page";

const mont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "Practice Stock Trading today!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  return (
    <html lang="en">
      <body className={`${mont.className}`}>
        <Header data={userData} />
        {children}
      </body>
    </html>
  );
}
