import { retrievePrice } from "./price";

export async function buyStock({
  userID,
  name,
  amount,
}: {
  name: string;
  amount: string;
  userID: string;
}) {
  const price: number | null = await retrievePrice(name);

  // Make sure amount isn't a decimal
  const numAmount = Math.floor(parseFloat(amount));

  // Make sure price is returned from API
  try {
    if (price === undefined || price === null) {
      throw Error(`Unable to Retrieve Stock Name = ${name}.`);
    }
    const res = await fetch(`https://stock.simoncheek.com/api/user/${userID}`);
    if (!res.ok) {
      throw Error("Invalid User");
    }
    const data = await res.json();
    const userData = JSON.parse(data.userData || "{}");
    let balance = parseFloat(userData.balance);
    const stocks = userData.stocks;

    // Make sure user can afford to buy the given stock
    const totalPrice = parseFloat((price * numAmount).toFixed(2));
    if (totalPrice > balance) {
      throw Error(`User cannot afford ${numAmount} shares of stock: ${name}!`);
    }

    // Make sure user doesn't own 6 or more different stocks
    if (!(name in stocks)) {
      const numOfStocks = Object.keys(stocks).length;
      if (numOfStocks >= 5) {
        throw Error("User can only own stocks from 5 or less companies!");
      }
      // Add stocks to User Info
      stocks[`${name}`] = numAmount;
    } else {
      stocks[`${name}`] += numAmount;
    }

    // Subtract total price from balance
    balance -= totalPrice;

    // Save Information in DB
    const newUserInfo = { ...userData, balance };
    const postRes = await fetch(`/api/user/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData: newUserInfo }),
    });
    if (!postRes.ok) {
      throw Error(`Invalid post request: ${postRes}`);
    }
  } catch (e) {
    console.log(e);
    alert("Unable to buy stock");
  }
}
