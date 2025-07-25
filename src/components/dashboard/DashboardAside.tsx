'use client'
import Link from "next/link";
import { Home, Bitcoin,  File, Settings, LogOut, Barcode, FileDigit, User, History } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "../ui/sonner";
// import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { deleteToken } from "@/lib/Token";

export const dasbhboardNavitems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  // { title: "Utility Payments", url: "/utilities", icon: Banknote },
  // { title: "Recharge & Subscriptions", url: "/recharge", icon: Calendar },
  // { title: "Gift Cards", url: "/giftcards", icon: Gift },
  { title: "Sell Crypto", url: "/crypto", icon: Bitcoin },
  { title: "Virtual Numbers", url: "/virtual-number", icon: FileDigit },
  { title: "Sms History", url: "/sms-history", icon: History },
  // { title: "Esim", url: "/esim", icon: FileDigit },
  { title: "Transactions", url: "/transactions", icon: Barcode },
  // { title: "Referral", url: "/referral", icon: Hash },
  { title: "Deposit", url: "/deposit", icon: File },
  { title: "Account", url: "/account", icon: Settings },
];
export interface logOutResponse{
  ok: boolean
}
export function ResponsiveSidebar() {
  const user = useAppSelector(state => state.auth.user.user)
  const router = useRouter();
  const pathName = usePathname()

  const logOut = async () => {
    try {
      const res = await fetch('/api/logout')
  
      const data: logOutResponse = await res.json();
      if(!data.ok) return;
      sessionStorage.removeItem('numberInfo');
      sessionStorage.removeItem('otp');
      deleteToken();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  

  return (
    <>
      <Toaster
        richColors
        position='top-center'
        duration={200}
      />
      <aside className="bg-white text-gray-600 p-2 hidden md:flex md:flex-col xl:min-w-64 max-w-64 h-screen">
        <div className="py-3">
            <Link href="#" className="text-xl md:text-3xl font-bold text-teal-800">
              FloZap
            </Link>
          </div>
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
        <div>
          {user && user.role === 'admin' && (
            <Link
              href='/admin'
              className={`flex gap-2 bg-teal-900 hover:bg-teal-700 text-white hover:shadow-md items-center  duration-500 rounded p-2 mt-4 cursor-pointer`}
            >
              <User size={24}/>
              <span>Admin</span>
            </Link>
          )}
          <button
            onClick={logOut}
            className="w-full flex gap-2 bg-teal-600 hover:bg-teal-700 text-white hover:shadow-md items-center space-x-3 duration-500 rounded p-2 mt-4 cursor-pointer">
            <LogOut size={24} /> Logout
          </button>
        </div>
      </aside>

    </>
  );
}
