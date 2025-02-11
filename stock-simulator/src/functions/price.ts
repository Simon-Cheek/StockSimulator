interface stockCacheInfo {
  price: number;
  lastFetched: Date;
}

// Localstorage Cache Management
export async function retrievePrice(name: string): Promise<number | null> {
  try {
    // Attempt to hit cache to reduce API Calls
    const cache = localStorage.getItem("stockSimulatorCache") || "{}";
    const cacheData: Record<string, stockCacheInfo> = JSON.parse(cache);
    if (cacheData[name]) {
      const cachedStock: stockCacheInfo = cacheData[name];
      const currentDate = new Date();
      const cachedDate = new Date(cachedStock.lastFetched);
      const fifteenMinutes = 1000 * 60 * 15;
      if (currentDate.getTime() - cachedDate.getTime() <= fifteenMinutes) {
        // Cache is valid
        return cachedStock.price;
      }
    }
    // Cache does not exist for stock - cold miss
    const url = `/api/stocks/${name}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw Error(`Error retrieving data for Stock: ${name}`);
    }
    const data = await res.json();
    const price = parseFloat(data?.price);
    if (!Number.isNaN(price)) {
      cacheData[name] = { price: data.price, lastFetched: new Date() };
      localStorage.setItem("stockSimulatorCache", JSON.stringify(cacheData));
      return price;
    } else return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
