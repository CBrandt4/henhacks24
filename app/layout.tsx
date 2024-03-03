import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TrpcProvider from "@/lib/trpc/trpc_client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Communication Tools",
  description:
    "Easy to use tools built to help people with autism communicate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
