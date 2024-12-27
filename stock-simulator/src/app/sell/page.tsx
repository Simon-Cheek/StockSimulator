"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import { Separator } from "@/components/separator";
import { useRouter } from "next/navigation";
import styles from "./sell.module.css";
import { sellStock } from "@/hooks/sellStock";

export default function Sell() {
  const router = useRouter();
  return (
    <div className={styles.sellContainer}>
      <InputForm
        buttonText="Sell"
        onClick={async (params) => {
          await sellStock(params);
          router.push("/");
          window.dispatchEvent(new Event("localStorageChange"));
        }}
      />
      <Separator />
      <Paragraph italic size="xs">
        Note: Stocks from up to 5 different companies can be held at once
      </Paragraph>
    </div>
  );
}
