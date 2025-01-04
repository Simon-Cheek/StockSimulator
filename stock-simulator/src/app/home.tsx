"use client";
import styles from "./home.module.css";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import Footer from "./footer";
import { AuthPage } from "@/components/authPage";
import { PageProps } from "./page";

export default function Home({ data }: PageProps) {
  return (
    <AuthPage>
      <div className={styles.menuContainer}>
        <Button href="/buy">Buy Stock</Button>
        <Separator vertical size="xs" />
        <Button href="/sell">Sell Stock</Button>
      </div>
      <Footer data={data} />
    </AuthPage>
  );
}
