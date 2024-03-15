import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Donut Bank",
  description: "DonutBank is world's biggest virtual bank using Donut Coins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
