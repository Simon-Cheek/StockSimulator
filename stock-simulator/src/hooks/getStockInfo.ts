interface stockInfo {
  currentBalance: Number;
  stocks: Record<string, Number>;
}

export const useStockInfo = (): stockInfo => {
  let info = localStorage.getItem('stockSimulatorUser');
  if (info) return JSON.parse(info);
  const newStockInfo = {
    currentBalance: 100000.00,
    stocks: {}
  }
  localStorage.setItem('stockSimulatorUser', JSON.stringify(newStockInfo))
  return newStockInfo;
}