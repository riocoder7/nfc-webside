
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "NFC Tap Card System",
  description: "A digital networking solution powered by NFC technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body >
      <Provider>
          {children}
      </Provider>
      </body>
    </html>
  );
}