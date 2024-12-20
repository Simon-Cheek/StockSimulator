import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import './global.css'
import Header from "./header";

const mont = Montserrat({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "Practice Stock Trading today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mont.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
