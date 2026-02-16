import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Google Sans isn't available via next/font — it's a proprietary Google font.
// Product Sans / Google Sans alternative: use Inter (Google's recommended open-source alternative)
// with adjusted weights to match Google Sans hierarchy.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hotel Distribution",
  description:
    "A modern textbook on hotel distribution strategy and technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-surface text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
