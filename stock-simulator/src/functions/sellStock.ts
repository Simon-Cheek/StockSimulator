import { retrievePrice } from "./price";

interface userInfo {
  currentBalance: string;
  stocks: Record<string, number>;
}

export async function sellStock({
  name,
  amount,
}: {
  name: string;
  amount: string;
}) {
  const price: number | null = await retrievePrice(name);

  // Make sure amount isn't a decimal
  const numAmount = Math.floor(parseFloat(amount));

  // Make sure price is returned from API
  try {
    if (price === undefined || price === null) {
      throw Error(`Unable to Retrieve Stock Name = ${name}.`);
    }
    const info = localStorage.getItem("stockSimulatorUser") || "";
    const parsedInfo: userInfo = await JSON.parse(info);
    // Make sure User Data Exists
    if (!parsedInfo?.stocks) {
      throw Error("No User Information in LocalStorage");
    }
    const stocks = parsedInfo.stocks;
    let balance: number = parseFloat(parsedInfo.currentBalance);

    // Make sure user has the number of stocks they are selling
    const userStockTotal: number = stocks[name];
    if (userStockTotal < numAmount) {
      throw Error(`User does not have enough of Stock: ${name}`);
    }

    // Subtract stock number from total
    stocks[name] -= numAmount;

    // Remove if number is zero
    if (stocks[name] === 0) {
      delete stocks[name];
    }

    // Calculate total value and add to user balance
    const totalValue = price * numAmount;
    balance += totalValue;

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
