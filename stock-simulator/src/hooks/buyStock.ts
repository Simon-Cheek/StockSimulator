interface userInfo {
  currentBalance: number;
  stocks: Record<string, number>;
}

interface stockCacheInfo {
  price: number;
  lastFetched: Date;
}

// Localstorage Cache Management
async function retrievePrice(name: string): Promise<number | null> {
  try {
    // Attempt to hit cache to reduce API Calls
    const cache = localStorage.getItem("stockSimulatorCache") || "{}";
    const cacheData: Record<string, stockCacheInfo> = JSON.parse(cache);
    if (cacheData[name]) {
      const cachedStock: stockCacheInfo = cacheData[name];
      const currentDate = new Date();
      const cachedDate = new Date(cachedStock.lastFetched);
      currentDate.setHours(0, 0, 0, 0);
      if (currentDate.getTime() <= cachedDate.getTime()) {
        // Cache is valid
        return cachedStock.price;
      }
    }
    // Cache does not exist for stock - cold miss
    const url = `/api/stock/${name}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw Error(`Error retrieving data for Stock: ${name}`);
    }
    const data = await res.json();
    const price = parseFloat(data?.price);
    if (!Number.isNaN(price)) {
      cacheData[name] = { price: data.price, lastFetched: new Date() };
      localStorage.setItem("stockSimulatorCache", JSON.stringify(cacheData));
      return data.price;
    } else return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function buyStock({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) {
  let price: number | null = await retrievePrice(name);

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
    let balance = parsedInfo.currentBalance;

    // Make sure user can afford to buy the given stock
    const totalPrice = parseFloat((price * amount).toFixed(2));
    if (totalPrice > balance) {
      throw Error(`User cannot afford ${amount} shares of stock: ${name}!`);
    }

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

    // Subtract total price from balance
    balance -= totalPrice;

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
