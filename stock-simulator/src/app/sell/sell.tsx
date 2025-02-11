"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import { Separator } from "@/components/separator";
import styles from "./sell.module.css";
import { sellStock } from "@/functions/sellStock";
import Footer from "../footer";
import { useRouter } from "next/navigation";
import Header from "../header";
import { ExchangeProps } from "../buy/buy";

export default function Sell({ data, userID }: ExchangeProps) {
  const router = useRouter();
  return (
    <>
      <Header data={data} />
      <div className={styles.sellContainer}>
        <InputForm
          buttonText="Sell"
          onClick={async (params) => {
            await sellStock({ ...params, userID });
            router.push("/"); // Navigate to home page
          }}
        />
        <Separator />
        <Paragraph italic size="xs">
          Note: Stocks from up to 5 different companies can be held at once
        </Paragraph>
      </div>
      <Footer data={data} />
    </>
  );
}
