"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import styles from "./buy.module.css";
import { Separator } from "@/components/separator";
import { buyStock } from "@/functions/buyStock";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import { AuthPage } from "@/components/authPage";
import { PageProps } from "../page";
import Header from "../header";

interface ExchangeProps extends PageProps {
  userID: string;
}

export default function Buy({ data, userID }: ExchangeProps) {
  const router = useRouter();
  return (
    <AuthPage>
      <Header data={data} />
      <div className={styles.buyContainer}>
        <InputForm
          buttonText="Buy"
          onClick={async (params) => {
            await buyStock({ ...params, userID });
            router.push("/");
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
