import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TrpcProvider from "@/lib/trpc/trpc_client";
import Link from "next/link";

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
      <body
        className={inter.className + " flex h-screen flex-col justify-between"}
      >
        <TrpcProvider>
          {children}
          <div className="flex h-16 w-full items-center justify-center bg-secondary object-bottom text-foreground">
            <div className="flex items-center justify-center text-center text-sm">
              <p>
                Built for the 2024 HenHacks Hackathon | Image Library from&nbsp;
                <Link
                  href="https://www.flaticon.com/free-icons/penguin"
                  title="penguin icons"
                >
                  Penguin icons, by Vectors Market - Flaticon
                </Link>
              </p>
            </div>
          </div>
        </TrpcProvider>
      </body>
    </html>
  );
}
