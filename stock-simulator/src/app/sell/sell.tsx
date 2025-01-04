"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import { Separator } from "@/components/separator";
import styles from "./sell.module.css";
import { sellStock } from "@/functions/sellStock";
import Footer from "../footer";
import { AuthPage } from "@/components/authPage";
import { PageProps, UserData } from "../page";

import { useRouter } from "next/navigation";

export default function Sell({ data }: PageProps) {
  return (
    <AuthPage>
      <div className={styles.sellContainer}>
        <InputForm
          buttonText="Sell"
          onClick={async (params) => {
            await sellStock(params);
            // Use client-side redirect after the sell action
            const router = useRouter();
            router.push("/"); // Navigate to home page
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
