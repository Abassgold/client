'use client'
import { useState } from "react";
import Link from "next/link";
import { Home, Banknote, Calendar, Bitcoin, Gift, Hash, File, Settings, LogOut, Barcode, FileDigit } from "lucide-react";
import { usePathname } from "next/navigation";

export const dasbhboardNavitems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  // { title: "Utility Payments", url: "/utilities", icon: Banknote },
  // { title: "Recharge & Subscriptions", url: "/recharge", icon: Calendar },
  // { title: "Gift Cards", url: "/giftcards", icon: Gift },
  { title: "Sell Crypto", url: "/crypto", icon: Bitcoin },
  { title: "Virtual Numbers", url: "/virtual-number", icon: FileDigit },
  { title: "Transactions", url: "/transactions", icon: Barcode },
  { title: "Account", url: "/Account", icon: Settings },
  // { title: "Esim", url: "/esim", icon: File },
];

export function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname()
  

  return (
    <>
      <aside className="bg-[#1F2937] text-white p-2 hidden md:block xl:min-w-64 max-w-64 relative">
        <h2 className="text-3xl font-bold mb-6 p-4 cursor-pointer">FloZap</h2>
        <nav className="flex flex-col space-y-3">
          {dasbhboardNavitems.map(({ title, url, icon: Icon }) => (
            <Link
              key={title}
              href={url}
              className="flex items-center space-x-3 hover:bg-white hover:text-gray-800 rounded p-2"
            >
              <Icon size={24} />
              <span>{title}</span>
            </Link>
          ))}
                  <button className="flex items-center gap-3 hover:bg-white hover:text-gray-800 rounded p-2"><LogOut size={24}/> Logout</button>
        </nav>
      </aside>
    </>
  );
}
