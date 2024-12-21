"use client"
import { useStockInfo } from "@/hooks/getStockInfo";
import { useEffect, useState } from "react";

interface stockInterface {
  currentBalance: Number;
  stocks: Record<string, Number>;
}

export default function Home() {

  // CLIENT SIDE LOCALSTORAGE
  const [stockInfo, setStockInfo] = useState<stockInterface | null>(null)
  useEffect(() => {
    setStockInfo(useStockInfo())
  }, [])

  return (
    <div>
      {stockInfo ? stockInfo?.currentBalance.toString() : "Loading"}
    </div>
  );
}
