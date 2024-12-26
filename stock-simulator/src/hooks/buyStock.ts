import { useRouter } from "next/router";

export async function buyStock({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) {
  const url = `/api/stock/${name}`;
  const res = await fetch(url);
  const data = await res.json();
  const price: number = data?.price;
  // Make sure price is returned from API
  try {
    if (!price) {
      throw Error(`Unable to Retrieve Stock Name = ${name}.`);
    }
    const info = localStorage.getItem("stockSimulatorUser") || "";
    const parsedInfo: {
      currentBalance: number;
      stocks: Record<string, number>;
    } = await JSON.parse(info);
    // Make sure User Data Exists
    if (!parsedInfo?.stocks) {
      throw Error("No User Information in LocalStorage");
    }
    const stocks = parsedInfo.stocks;
    let balance = parsedInfo.currentBalance;

    // Make sure user can afford to buy the given stock
    const totalPrice = parseFloat((price * amount).toFixed(2));
    if (totalPrice > balance) {
      throw Error(`User cannot afford ${amount} shares of stock: ${name}!`);
    }

    // Subtract total price from balance
    balance -= totalPrice;

    // Make sure user doesn't own 6 or more different stocks
    if (!(name in stocks)) {
      const numOfStocks = Object.keys(stocks).length;
      if (numOfStocks >= 5) {
        throw Error("User can only own stocks from 5 or less companies!");
      }
      // Add stocks to User Info
      stocks[`${name}`] = amount;
    } else {
      stocks[`${name}`] += amount;
    }

    // Save Information in LocalStorage
    const newStockInfo = {
      currentBalance: balance.toFixed(2),
      stocks: stocks,
    };
    localStorage.setItem("stockSimulatorUser", JSON.stringify(newStockInfo));
  } catch (e) {
    alert(e);
  }
}
