import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Hotel Distribution",
  description:
    "A modern textbook on hotel distribution strategy and technology",
  openGraph: {
    title: "Hotel Distribution — Online Textbook",
    description: "14 chapters on strategy, technology, and the channels that connect hotels to guests — written by industry practitioners for hospitality leaders.",
    url: "https://hoteldistro.com",
    siteName: "Hotel Distribution",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Distribution — Online Textbook",
    description: "14 chapters on strategy, technology, and the channels that connect hotels to guests — written by industry practitioners for hospitality leaders.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-597FL8XK0B" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-597FL8XK0B');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-surface text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
