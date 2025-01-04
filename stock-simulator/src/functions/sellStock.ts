import { retrievePrice } from "./price";

export async function sellStock({
  name,
  amount,
  userID,
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

    // Save Information in DB
    const newUserInfo = { ...userData, balance };
    const postRes = await fetch(
      `https://stock.simoncheek.com/api/user/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      }
    );
    if (!postRes.ok) {
      throw Error(`Invalid post request: ${postRes}`);
    }
  } catch (e) {
    alert(e);
  }
}
