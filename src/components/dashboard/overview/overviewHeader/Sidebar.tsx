'use client'
import {  LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { dasbhboardNavitems, logOutResponse } from "../../DashboardAside";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
interface sidebarType {
    isOpen: boolean;
    toggleSidebar: () => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, setActiveSection }: sidebarType) => {
    const pathName = usePathname();
    const user = useAppSelector(state => state.auth.user.user)

    const router = useRouter();
    const logOut = async () => {
        try {
          const res = await fetch('/api/logout')
      
          const data: logOutResponse = await res.json();
          if(!data.ok) return;
          sessionStorage.removeItem('numberInfo');
          sessionStorage.removeItem('otp');
          router.push('/login');
        } catch (err) {
          console.error('Logout failed:', err);
        }
      };

    return (
        <aside
            className={`fixed  top-0 left-0 h-screen w-full bg-gray-800 text-white flex flex-col md:hidden transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 z-20`}
        >
            <div className="px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl text-white px-2 font-semibold">FloZap</h1>
                <button
                    className="md:hidden text-white"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                >
                    <X className=" cursor-pointer" />
                </button>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {dasbhboardNavitems.map((item) => {
                        const isActive = pathName.startsWith(item.url)
                        return (
                            <li key={item.title}>
                                <Link href={item.url}>
                                    <button
                                        onClick={() => {
                                            setActiveSection(item.url);
                                            if (window.innerWidth < 768) toggleSidebar();
                                        }}
                                        className={`cursor-pointer flex items-center gap-3 w-full p-2 rounded text-left ${isActive
                                            ? "bg-gray-600"
                                            : "hover:bg-gray-700"
                                            }`}
                                    >
                                        <item.icon size={24} />
                                        {item.title}
                                    </button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className="p-4">
                {user && user.role === 'admin' && (
                    <div>
                        <Link href='/admin'>
                            <button
                                onClick={() => {
                                    if (window.innerWidth < 768) toggleSidebar();
                                }}
                                className="flex cursor-pointer items-center gap-3 w-full text-left p-2  hover:bg-gray-700 rounded transition">
                                <User size={24} />
                                Admin
                            </button>
                        </Link>
                    </div>
                )}
                <button
                    onClick={logOut}
                    className="flex cursor-pointer items-center gap-3 w-full text-left  p-2 hover:bg-gray-700 rounded transition">
                    <LogOut size={24} />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar