"use client";

import { colors } from "@/components/colors";
import { H1, H3 } from "../components/headers";
import styles from "./home.module.css";
import { Span } from "@/components/span";
import { Separator } from "@/components/separator";
import { useStockInfo } from "@/functions/getStockInfo";

export default function Header() {
  // CLIENT SIDE LOCALSTORAGE
  const stockInfo = useStockInfo();

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <H1>Stock Simulator</H1>
        <Separator size="sm" />
        <H3>
          Current Value:
          <Span color={colors.blue}>
            {stockInfo ? ` $${stockInfo.currentBalance}` : " $0"}
          </Span>
        </H3>
      </div>
    </div>
  );
}
