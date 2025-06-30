'use client'
import Link from "next/link";
import { Home, Bitcoin, Hash, File, Settings, LogOut, Barcode, FileDigit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "../ui/sonner";

export const dasbhboardNavitems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  // { title: "Utility Payments", url: "/utilities", icon: Banknote },
  // { title: "Recharge & Subscriptions", url: "/recharge", icon: Calendar },
  // { title: "Gift Cards", url: "/giftcards", icon: Gift },
  { title: "Sell Crypto", url: "/crypto", icon: Bitcoin },
  { title: "Virtual Numbers", url: "/virtual-number", icon: FileDigit },
  { title: "Esim", url: "/esim", icon: FileDigit },
  { title: "Transactions", url: "/transactions", icon: Barcode },
  { title: "Referral", url: "/referral", icon: Hash },
  { title: "Deposit", url: "/deposit", icon: File },
  { title: "Account", url: "/account", icon: Settings },
];
// interface logOutTpe {
//   ok: boolean;
//   msg: string;
// }
export function ResponsiveSidebar() {
  const router = useRouter();
  const pathName = usePathname()
  const logOut = async () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login')
  }
  return (
    <>
      <Toaster
        richColors
        position='top-center'
        duration={200}
      />
      <aside className="bg-white text-gray-600 p-2 hidden md:flex md:flex-col xl:min-w-64 max-w-64 h-screen">
        <h2 className="text-3xl font-bold mb-6 p-3 cursor-pointer border-b-2">FloZap</h2>

        <nav className="flex-1 flex flex-col space-y-3">
          {dasbhboardNavitems.map(({ title, url, icon: Icon }) => (
            <Link
              key={title}
              href={url}
              className={`flex ${pathName.startsWith(url) ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-600'} hover:shadow-md items-center space-x-3 hover:bg-teal-800 hover:text-white duration-500 rounded p-2`}
            >
              <Icon size={24} />
              <span>{title}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={logOut}
          className="flex gap-2 bg-teal-600 hover:bg-teal-700 text-white hover:shadow-md items-center space-x-3 duration-500 rounded p-2 mt-4 cursor-pointer">
          <LogOut size={24} /> Logout
        </button>
      </aside>

    </>
  );
}
