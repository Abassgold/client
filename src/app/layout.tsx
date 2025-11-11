import type { Metadata } from "next";
import "./globals.css";
import { Barlow_Condensed } from "next/font/google";

import StoreProvider from "@/redux/StoreProvider";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/sonner";

const barlow = Barlow_Condensed({
  weight: "600",
  subsets: ["latin"],
});

// Metadata for SEO, Open Graph & Twitter
export const metadata: Metadata = {
  title: "FloZap | Smart Digital Services for Everyone",
  description:
    "FloZap is your all-in-one digital platform for virtual numbers, eSIMs, airtime, data, utility bill payments, and crypto services. Stay connected, secure, and in control — all from one powerful app designed for speed, simplicity, and growth.",
  keywords: [
    "FloZap",
    "virtual numbers",
    "Verification numbers",
    "USA WhatsApp numbers",
    "eSIM",
    "airtime top-up",
    "data subscription",
    "utility payments",
    "crypto services USDT",
    "digital platform",
    "bill payments",
    "Fintech Nigeria",
  ],
  authors: [{ name: "Azeez Abass" }],
  creator: "Azeez Abass",
  publisher: "FloZap",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.flozap.com.ng/",
    siteName: "FloZap",
    title: "FloZap | Stay Connected, Powered, and in Control",
    description:
      "Experience FloZap — the ultimate platform for managing your digital life. Buy virtual numbers, eSIMs, airtime, data, pay bills, and access crypto services — all in one seamless app.",
    images: [
      {
        url: "https://www.flozap.com.ng/myflozap_logo.png",
        width: 1200,
        height: 630,
        alt: "FloZap — Your all-in-one digital platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FloZap | Smart Digital Services for Everyone",
    description:
      "Manage your digital needs in one place — from eSIMs and virtual numbers to airtime, data, and utility payments. FloZap keeps you connected and in control.",
    creator: "@FloZapofficial",
    images: ["https://www.flozap.com.ng/myflozap_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#0d9488",
  manifest: "/manifest.json",
  icons: {
    icon: "/myflozap_logo.png",
    shortcut: "/myflozap_logo.png",
    apple: "/myflozap_logo.png",
  },
  other: {
    cryptomus: "8e611e74",
  },
};

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={barlow.className}>
        <head>
        {/* ✅ Manual OpenGraph Tags for Twitter/X and other crawlers */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="FloZap | Smart Digital Services for Everyone"
        />
        <meta
          property="og:description"
          content="FloZap is your all-in-one platform for virtual numbers, eSIMs, airtime, data, utility bills and more."
        />
        <meta
          property="og:image"
          content="https://www.flozap.com.ng/myflozap_logo.png"
        />
        <meta property="og:url" content="https://www.flozap.com.ng" />
        <meta property="og:site_name" content="FloZap" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@FloZapofficial" />
        <meta
          name="twitter:title"
          content="FloZap | Smart Digital Services for Everyone"
        />
        <meta
          name="twitter:description"
          content="Manage virtual numbers, eSIMs, airtime, data and utility payments — all in one place."
        />
        <meta
          name="twitter:image"
          content="https://www.flozap.com.ng/myflozap_logo.png"
        />
      </head>
      <body>
        {/* React Toastify */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Sonner Toaster */}
        <Toaster duration={3000} richColors position="top-center" />

        {/* Redux Store Provider */}
        <StoreProvider>{children}</StoreProvider>

        {/* Telegram Floating Link */}
        <Link
          className="fixed bottom-2 right-2 z-50 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition animate-bounce duration-500"
          target="_blank"
          href="https://t.me/flozap"
        >
          <Image
            src="/Telegram_logo.svg"
            alt="Telegram Logo"
            width={30}
            height={30}
          />
        </Link>
      </body>
    </html>
  );
}
