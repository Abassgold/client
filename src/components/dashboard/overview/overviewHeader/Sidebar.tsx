'use client'
import { X } from "lucide-react";
import Link from "next/link";
interface sidebarType {
    isOpen: boolean;
    toggleSidebar: () => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
}
interface NavItem {
    title: string;
    url: string;
}


const Sidebar = ({ isOpen, toggleSidebar, activeSection, setActiveSection }: sidebarType) => {
   const navItems: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard/dashboard",
  },
  {
    title: "Utility Payments",
    url: "/dashboard/utilities",
  },
  {
    title: "Recharge & Subscriptions",
    url: "/dashboard/recharge",
  },
  {
    title: "Sell Crypto",
    url: "/dashboard/crypto",
  },
  {
    title: "Gift Cards",
    url: "/dashboard/giftcards",
  },
  {
    title: "Virtual Numbers",
    url: "/dashboard/virtualnumbers",
  },
]
    return (
        <aside
            className={`fixed  top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col md:hidden transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 z-20`}
        >
            <div className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">FloZap</h1>
                <button
                    className="md:hidden text-white"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                >
                    <X className=" cursor-pointer"/>
                </button>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.title}>
                            <Link href={item.url}>
                            <button
                                onClick={() => {
                                    setActiveSection(item.url);
                                    if (window.innerWidth < 768) toggleSidebar();
                                }}
                                className={`flex items-center w-full p-2 rounded-lg text-left ${activeSection === item.title
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                                    }`}
                            >
                                {item.title}
                            </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4">
                <Link href="/logout">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition">
                        Logout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar