'use client'
import { Bell } from 'lucide-react';
import  { useState } from 'react'
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const OverviwHeader = () => {
  const pathName =usePathname()
  console.log(pathName);
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathName);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <section>
      <nav className="flex justify-between items-center bg-teal-800 text-white px-2 py-4">
        <div className="flex items-center">
          <button
            className="md:hidden text-white mr-4"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">FloZap</h1>
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Bell fill="white" className="cursor-pointer" />
          <span className="hidden sm:block">Welcome, John Doe</span>
          <div className="me-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            JD
          </div>
        </div>
      </nav>

      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </section>
  )
}

export default OverviwHeader