import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo by Goldie",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col justify-between font-light bg-Ivory ${inter.className}`}
      >
        <SessionProvider>
          <NavBar />
          <main className="max-w-7×1 m-auto min-w-[300px] p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
