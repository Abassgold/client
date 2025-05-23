'use client'
import { useState } from "react";
import Link from "next/link";
import { Home, Banknote, Calendar, Bitcoin, Gift, Hash, File } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Utility Payments", url: "/utilities", icon: Banknote },
  { title: "Recharge & Subscriptions", url: "/recharge", icon: Calendar },
  { title: "Sell Crypto", url: "/crypto", icon: Bitcoin },
  { title: "Gift Cards", url: "/giftcards", icon: Gift },
  { title: "Virtual Numbers", url: "/virtual-number", icon: Hash },
  { title: "Esim", url: "/esim", icon: File },
];

export function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname()
  

  return (
    <>
      <aside className="bg-[#1F2937] text-white p-2 hidden md:block max-w-64 ">
        <h2 className="text-3xl font-bold mb-6 p-4 cursor-pointer">FloZap</h2>
        <nav className="flex flex-col space-y-3">
          {items.map(({ title, url, icon: Icon }) => (
            <Link
              key={title}
              href={url}
              className="flex items-center space-x-3 hover:bg-white hover:text-gray-800 rounded p-2"
            >
              <Icon size={24} />
              <span>{title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
