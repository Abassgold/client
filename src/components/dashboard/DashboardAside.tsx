'use client'
import Link from "next/link";
import { Home, Bitcoin,  File, Settings, Barcode, FileDigit, History, PhoneCall,
 RefreshCcwIcon, ZapIcon, TvIcon, CreditCard, DollarSignIcon, GlobeIcon, WifiIcon, PhoneIcon, LogOutIcon, HelpCircleIcon, SettingsIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { deleteToken } from "@/lib/Token";
import NavItem from "../navItems/NavItems";
export const navItems = [{
    to: '/user/dashboard',
    icon: <Home size={18} />,
    label: 'Dashboard'
  }, {
    to: '/user/airtime',
    icon: <PhoneIcon size={18} />,
    label: 'Airtime Recharge'
  }, {
    to: '/user/data',
    icon: <WifiIcon size={18} />,
    label: 'Data Bundles'
  }, {
    to: '/user/virtual-number',
    icon: <GlobeIcon size={18} />,
    label: 'Virtual Number'
  }, {
    to: '/user/esim',
    icon: <CreditCard size={18} />,
    label: 'eSIM'
  }, {
    to: '/user/usdt',
    icon: <DollarSignIcon size={18} />,
    label: 'USDT'
  }, {
    to: '/user/cable-tv',
    icon: <TvIcon size={18} />,
    label: 'Cable TV'
  }, {
    to: '/user/electricity',
    icon: <ZapIcon size={18} />,
    label: 'Electricity'
  }, {
    to: '/user/airtime-to-cash',
    icon: <RefreshCcwIcon size={18} />,
    label: 'Airtime to Cash'
  },
  { label: "Sms History", to: "/user/sms-history", icon: <History size={18} /> },
  { label: "Transactions", to: "/user/transactions", icon: <Barcode size={18} /> },
];

 export  const bottomNavItems = [{
    to: '/user/account',
    icon: <SettingsIcon size={18} />,
    label: 'Settings'
  }, {
    to: 'https://wa.me/qr/BHKITMXTHP2PE1',
    icon: <HelpCircleIcon size={18} />,
    label: 'Help & Support'
  }];
export const dasbhboardNavitems = [
  { title: "Overview", url: "/user/dashboard", icon: Home },
  { title: "Sell Crypto", url: "/user/crypto", icon: Bitcoin },
  { title: "Virtual Numbers", url: "/user/virtual-number", icon: FileDigit },
  { title: "Sms History", url: "/user/sms-history", icon: History },
  { title: "Transactions", url: "/user/transactions", icon: Barcode },
  { title: "Deposit", url: "/user/deposit", icon: File },
  { title: "Contact-Us", url: "https://wa.me/qr/BHKITMXTHP2PE1", icon: PhoneCall },
  { title: "Account", url: "/user/account", icon: Settings },
];
export interface logOutResponse{
  ok: boolean
}
export function ResponsiveSidebar() {
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
       <aside className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col transition-all duration-300 w-64`}>
      <div className="p-4 flex items-center justify-center">
         <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="ml-3 font-bold text-slate-900 dark:text-white">
              FloZap
            </span>
          </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.map(item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} active={pathName === item.to} />)}
        </nav>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-4">
        <nav className="space-y-1">
          {bottomNavItems.map(item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} active={pathName === item.to} />)}
          <Link href='#' className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-all text-[#5e677b] dark:text-[#c4cde1] hover:bg-[#ebeef5] dark:hover:bg-[#3f4552]`}
          onClick={logOut}
          >
      <div className="flex items-center">
        <span className="w-5 h-5"><LogOutIcon size={18} /></span>
        <span className="ml-3 text-sm font-medium whitespace-nowrap">
            Logout
          </span>
      </div>
    </Link>;
        </nav>
      </div>
    </aside>
    </>
  );
}
