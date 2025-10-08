'use client'
import {  LogOutIcon, X } from "lucide-react";
import Link from "next/link";
import { bottomNavItems, logOutResponse, navItems } from "../../DashboardAside";
import { usePathname, useRouter } from "next/navigation";
import { deleteToken } from "@/lib/Token";
import NavItem from "@/components/navItems/NavItems";

interface sidebarType {
    isOpen: boolean;
    toggleSidebar: () => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: sidebarType) => {
    const pathName = usePathname();
    const router = useRouter();
    const logOut = async () => {
        try {
            const res = await fetch('/api/logout');
            const data: logOutResponse = await res.json();
            if (!data.ok) return;
            sessionStorage.removeItem('numberInfo');
            sessionStorage.removeItem('otp');
            deleteToken();
            router.push('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
<aside
  className={`fixed top-0 left-0 bg-[#1a2328] h-screen w-full text-white flex flex-col md:hidden transform 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-20`}
>
  {/* Mobile Sidebar Header */}
  <div className="p-4 flex items-center justify-between border-b border-teal-800">
    <div className="flex items-center">
      <div className="w-8 h-8 bg-white text-teal-900 rounded-md flex items-center justify-center font-bold">
        F
      </div>
      <span className="ml-3 font-bold">FloZap</span>
    </div>
    <button onClick={toggleSidebar} aria-label="Close sidebar">
      <X className="cursor-pointer" />
    </button>
  </div>

  {/* Mobile Nav */}
  <div className="flex-1 overflow-y-auto px-3 py-4 "
  >
    <nav className="space-y-1">
      {navItems.map(item => (
        <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} active={pathName === item.to} onClick={toggleSidebar} />
      ))}
    </nav>
  </div>

  {/* Mobile Bottom Nav */}
  <div className="border-t border-teal-800 dark:border-slate-800 px-3 py-4 ">
    <nav className="space-y-1">
      {bottomNavItems.map(item => (
        <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} active={pathName === item.to} onClick={toggleSidebar} />
      ))}
      <Link
        href="#"
        onClick={logOut}
        className="flex items-center px-4 py-3 mb-1 rounded-lg transition-all 
        text-[#5e677b] dark:text-[#c4cde1] hover:bg-[#ebeef5] dark:hover:bg-[#3f4552]"
      >
        <LogOutIcon size={18} />
        <span className="ml-3 text-sm font-medium whitespace-nowrap">Logout</span>
      </Link>
    </nav>
  </div>
</aside>

    )


    
};

export default Sidebar;
