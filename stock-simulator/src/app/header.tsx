"use client"

import { colors } from "@/components/colors";
import { H1, H3 } from "../components/headers";
import styles from './home.module.css'
import { Span } from "@/components/span";
import { Separator } from "@/components/separator";
import { useEffect, useState } from "react";
import { useStockInfo } from "@/hooks/getStockInfo";

export default function Header() {

    interface stockInterface {
      currentBalance: Number;
      stocks: Record<string, Number>;
    }
  
    // CLIENT SIDE LOCALSTORAGE
    const [stockInfo, setStockInfo] = useState<stockInterface | null>(null)
    useEffect(() => {
      setStockInfo(useStockInfo())
    }, [])

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <H1>Stock Simulator</H1>
        <Separator size="sm" />
        <H3>Current Value:  
          <Span color={colors.green}>{stockInfo ? ` $${stockInfo.currentBalance}` : ' $0'}</Span>
        </H3>
      </div>
    </div>
  );
}
