"use client";

import styles from "./home.module.css";
import { useStockInfo } from "@/hooks/getStockInfo";
import { BulletedList } from "@/components/bulletedList";
import { Paragraph } from "@/components/paragraph";

export default function Footer() {
  // CLIENT SIDE LOCALSTORAGE
  const stockInfo = useStockInfo();

  const listOfStocks = stockInfo
    ? Object.entries(stockInfo.stocks).map(([k, v]) => `${k} (${v})`)
    : [];

  return (
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
  );
}
