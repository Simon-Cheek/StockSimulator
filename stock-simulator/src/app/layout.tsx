import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./global.css";

const mont = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "Practice Stock Trading today!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mont.className}`}>{children}</body>
    </html>
  );
}
