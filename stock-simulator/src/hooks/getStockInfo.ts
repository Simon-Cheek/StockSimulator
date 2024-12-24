import { useEffect, useState } from "react";

interface stockInfo {
  currentBalance: number;
  stocks: Record<string, number>;
}

export const useStockInfo = (): stockInfo | null => {
  const [stockInfo, setStockInfo] = useState<stockInfo | null>(null);
  useEffect(() => {
    const info = localStorage.getItem("stockSimulatorUser");
    if (info) setStockInfo(JSON.parse(info));
    const newStockInfo = {
      currentBalance: 100000.0,
      stocks: {},
    };
    localStorage.setItem("stockSimulatorUser", JSON.stringify(newStockInfo));
    setStockInfo(newStockInfo);
  }, []);
  return stockInfo;
};
