"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import styles from "./buy.module.css";
import { Separator } from "@/components/separator";
import { buyStock } from "@/functions/buyStock";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import { AuthPage } from "@/components/authPage";
import { GetServerSidePropsContext } from "next";
import * as cookie from "cookie";
import { PageProps, UserData } from "../page";

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

export default function Buy({ data }: PageProps) {
  const router = useRouter();
  return (
    <AuthPage>
      <div className={styles.buyContainer}>
        <InputForm
          buttonText="Buy"
          onClick={async (params) => {
            await buyStock(params);
            router.push("/");
            window.dispatchEvent(new Event("localStorageChange"));
          }}
        />
        <Separator />
        <Paragraph italic size="xs">
          Note: Stocks from up to 5 different companies can be held at once
        </Paragraph>
      </div>
      <Footer data={data} />
    </AuthPage>
  );
}
