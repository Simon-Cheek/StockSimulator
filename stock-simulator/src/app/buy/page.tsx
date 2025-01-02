"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import styles from "./buy.module.css";
import { Separator } from "@/components/separator";
import { buyStock } from "@/functions/buyStock";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import { AuthPage } from "@/components/authPage";

export default function Buy() {
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
      <Footer />
    </AuthPage>
  );
}
