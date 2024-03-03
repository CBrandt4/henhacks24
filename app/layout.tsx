import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TrpcProvider from "@/lib/trpc/trpc_client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roboto = Roboto({ weight: "900", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChitChat",
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
        className={cn(
          roboto.className,
          "flex h-screen flex-col justify-between",
        )}
      >
        <TrpcProvider>
          <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex min-h-full min-w-full justify-center p-6">
              {children}
            </div>
            <div className="flex h-16 w-full items-center justify-center justify-self-end bg-secondary object-bottom text-center text-sm">
              <p>
                Built for the 2024 HenHacks Hackathon | All images from&nbsp;
                <Link
                  href="https://www.flaticon.com/free-icons/penguin"
                  title="penguin icons"
                >
                  Flaticon
                </Link>
                &nbsp; and it&apos;s contributing artists
              </p>
            </div>
          </main>
        </TrpcProvider>
      </body>
    </html>
  );
}
