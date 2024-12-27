"use client";
import styles from "./home.module.css";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";

export default function Home() {
  return (
    <div className={styles.menuContainer}>
      <Button href="/buy">Buy Stock</Button>
      <Separator vertical size="xs" />
      <Button href="/sell">Sell Stock</Button>
    </div>
  );
}
