import styles from "./home.module.css";
import { BulletedList } from "@/components/bulletedList";
import { Paragraph } from "@/components/paragraph";
import { PageProps } from "./page";

export default function Footer({ data }: PageProps) {
  const stockInfo = data;

  const listOfStocks =
    stockInfo && stockInfo?.stocks
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
