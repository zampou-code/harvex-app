import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ProvidersLayout } from "@/components/pages/providers-layout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harvex",
  description: "Investissez dans un avenir durable avec HARVEX GROUPE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} antialiased`}
      >
        <ProvidersLayout>{children}</ProvidersLayout>
      </body>
    </html>
  );
}
