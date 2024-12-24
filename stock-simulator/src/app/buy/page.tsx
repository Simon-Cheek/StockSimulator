"use client";
import { Paragraph } from "@/components/paragraph";
import { InputForm } from "@/components/textInput";
import styles from "./buy.module.css";
import { Separator } from "@/components/separator";

export default function Buy() {
  return (
    <div className={styles.buyContainer}>
      <InputForm buttonText="Buy" onClick={() => alert("YOU DID IT")} />
      <Separator />
      <Paragraph italic size="xs">
        Note: Stocks from up to 5 different companies can be held at once
      </Paragraph>
    </div>
  );
}
