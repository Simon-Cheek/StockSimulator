"use client";
import { BulletedList } from "@/components/bulletedList";
import { Paragraph } from "@/components/paragraph";
import { useStockInfo } from "@/hooks/getStockInfo";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Button } from "@/components/button";

interface stockInterface {
  currentBalance: Number;
  stocks: Record<string, Number>;
}

export default function Home() {
  // CLIENT SIDE LOCALSTORAGE
  const [stockInfo, setStockInfo] = useState<stockInterface | null>(null);
  useEffect(() => {
    setStockInfo(useStockInfo());
  }, []);

  const listOfStocks = stockInfo
    ? Object.entries(stockInfo.stocks).map(([k, v]) => `${k} (${v})`)
    : [];

  return (
    <>
      <div className={styles.buyStockContainer}>
        <Button>Buy Stock</Button>
      </div>
      <div className={styles.stockListContainer}>
        <div className={styles.stockList}>
          {stockInfo ? (
            <BulletedList
              title="Currently Owned Stocks"
              list={
                listOfStocks.length > 0
                  ? listOfStocks
                  : ["No Stocks Currently Owned!"]
              }
              size="md"
            />
          ) : (
            <Paragraph size="lg">Loading...</Paragraph>
          )}
        </div>
      </div>
    </>
  );
}
