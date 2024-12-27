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

  const stockURL = `https://finnhub.io/api/v1/quote?symbol=${name.toUpperCase()}&token=${
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
    const price = data.c;
    if (price) {
      return NextResponse.json({ name: name, price: price });
    } else {
      return errorResponse;
    }
  } catch {
    return errorResponse;
  }
}
