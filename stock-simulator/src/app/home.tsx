"use client";
import styles from "./home.module.css";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import Footer from "./footer";
import { PageProps } from "./page";
import Header from "./header";
import { LogoutButton } from "@/components/logoutButton";

export default function Home({ data }: PageProps) {
  return (
    <>
      <Header data={data} />
      <div className={styles.menuContainer}>
        <Button href="/buy">Buy Stock</Button>
        <Separator vertical size="xs" />
        <Button href="/sell">Sell Stock</Button>
        <Separator vertical size="xs" />
        <LogoutButton />
      </div>
      <Footer data={data} />
    </>
  );
}
