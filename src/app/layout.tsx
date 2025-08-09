import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

import StoreProvider from "@/redux/StoreProvider";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "FloZap",
  description: "FloZap is a smart digital platform for buying virtual numbers, crypto transactions, esim activations, and more — all in one place.",
  icons: {
  icon: '/myflozap_logo.png',
  shortcut: '/myflozap_logo.png',
  apple: '/myflozap_logo.png',
}
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
           <Toaster
           duration={3000}
           richColors
           position='top-center'
           />
        <StoreProvider>
          {children}
        </StoreProvider>
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

