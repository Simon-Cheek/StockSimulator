import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await params).name;

  if (!name || !name.match(/^[A-Za-z]+$/)) {
    return NextResponse.json(
      { message: "Please include a valid name" },
      { status: 400 }
    );
  }

  const stockURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name.toUpperCase()}&apikey=${
    process.env.STOCK_API_KEY
  }`;

  const errorResponse = NextResponse.json(
    { message: "Error fetching data" },
    { status: 400 }
  );

  try {
    const stockResponse = await fetch(stockURL);
    if (!stockResponse.ok) {
      return errorResponse;
    }
    const data = await stockResponse.json();
    console.log("data: ", data);
    const price = data["Global Quote"]["05. price"];
    if (price) {
      return NextResponse.json({ name: name, price: price });
    } else {
      return errorResponse;
    }
  } catch {
    return errorResponse;
  }
}
