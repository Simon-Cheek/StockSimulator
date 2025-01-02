"use client";
import styles from "./home.module.css";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import Footer from "./footer";
import { AuthPage } from "@/components/authPage";

export default function Home() {
  return (
    <AuthPage>
      <div className={styles.menuContainer}>
        <Button href="/buy">Buy Stock</Button>
        <Separator vertical size="xs" />
        <Button href="/sell">Sell Stock</Button>
      </div>
      <Footer />
    </AuthPage>
  );
}
