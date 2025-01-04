"use client";
import styles from "./home.module.css";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import Footer from "./footer";
import { AuthPage } from "@/components/authPage";
import * as cookie from "cookie";
import { GetServerSidePropsContext } from "next";

export interface UserData {
  apiKey: string;
  password: string;
  balance: string;
  stocks: Record<string, string>;
}

export interface PageProps {
  data: UserData;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  console.log(cookies);
  const userID = cookies?.stockSimUser;
  console.log(userID);
  if (!userID) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(`/api/user/${userID}`);
  if (!res.ok) {
    console.log("res not ok");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const data = await res.json();
  const userData: UserData = data.userData;
  console.log(userData);

  return { props: { data: userData } };
}

export default function Home({ data }: PageProps) {
  return (
    <AuthPage>
      <div className={styles.menuContainer}>
        <Button href="/buy">Buy Stock</Button>
        <Separator vertical size="xs" />
        <Button href="/sell">Sell Stock</Button>
      </div>
      <Footer data={data} />
    </AuthPage>
  );
}
