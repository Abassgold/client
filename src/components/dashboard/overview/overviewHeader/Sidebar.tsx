'use client'
import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { dasbhboardNavitems } from "../../DashboardAside";
interface sidebarType {
    isOpen: boolean;
    toggleSidebar: () => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
}



const Sidebar = ({ isOpen, toggleSidebar, activeSection, setActiveSection }: sidebarType) => {
 
    return (
        <aside
            className={`fixed  top-0 left-0 h-screen w-full bg-gray-800 text-white flex flex-col md:hidden transform ${isOpen ? "translate-x-0" : "-translate-x-full"
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
                    {dasbhboardNavitems.map((item) => (
                        <li key={item.title}>
                            <Link href={item.url}>
                            <button
                                onClick={() => {
                                    setActiveSection(item.url);
                                    if (window.innerWidth < 768) toggleSidebar();
                                }}
                                className={`flex items-center gap-3 w-full p-2 rounded text-left ${activeSection === item.title
                                    ? "bg-gray-700"
                                    : "hover:bg-gray-700"
                                    }`}
                            >
                                <item.icon size={24}/>
                                {item.title}
                            </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4">
                <Link href="/logout">
                    <button className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition">
                        <LogOut size={24}/>
                        Logout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar