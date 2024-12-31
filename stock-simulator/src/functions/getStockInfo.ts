"use client";
import { useCallback, useEffect, useState } from "react";

interface stockInfo {
  currentBalance: number;
  stocks: Record<string, number>;
}

export const useStockInfo = (): stockInfo | null => {
  const [stockInfo, setStockInfo] = useState<stockInfo | null>(null);
  const loadStockInfo = useCallback(() => {
    const info = localStorage.getItem("stockSimulatorUser");
    if (info) {
      setStockInfo(JSON.parse(info));
    } else {
      const newStockInfo = {
        currentBalance: 100000.0,
        stocks: {},
      };
      localStorage.setItem("stockSimulatorUser", JSON.stringify(newStockInfo));
      setStockInfo(newStockInfo);
    }
  }, []);

  // Event listener to run above function when localStorageChange event is active
  useEffect(() => {
    loadStockInfo();
    window.addEventListener("localStorageChange", loadStockInfo);
    return () =>
      window.removeEventListener("localStorageChange", loadStockInfo);
  }, [loadStockInfo]);

  return stockInfo;
};
