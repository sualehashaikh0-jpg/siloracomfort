import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "SILORA — Bedsheets, Duvet Covers & Luxury Bedding",
  description:
    "Premium bedsheets, duvet covers, comforters and bed sets. Crafted for softer sleep. Free nationwide delivery across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${cormorant.variable} font-[family-name:var(--font-jost)]`}
      >
        <AnnouncementBar />
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
