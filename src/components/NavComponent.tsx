'use client'
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

const NavHeader = () => {
  const navLink = [
    { name: 'Features', link: '#features' },
    { name: 'About Us', link: '#about-us' },
    { name: 'Contact-Us', link: '#contact-us' },
    { name: 'FAQ', link: '#courses' },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#dde6f8] p-4 sticky z-50 top-0 shadow-md text-gray-600">
      <div className="max-w-[70rem] mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FloZap</h1>

        {/* Desktop Navigation */}
        <div className="space-x-4 text-sm md:text-base hidden sm:flex">
          {navLink.map((item, index) => (
            <Link href={item.link} key={index}>{item.name}</Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="text-sm md:text-base hidden sm:flex items-center gap-6 ">
          <Link href='/login' className="block text-teal-800">Login</Link>
          <Link href='/register' className="block py-3 px-6 rounded-full bg-teal-600 hover:bg-teal-800 text-white duration-300">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          className="sm:hidden p-2 bg-teal-700 text-white rounded-lg"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`sm:hidden fixed top-[4.5rem] left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs rounded-lg z-40 bg-white shadow-md border border-zinc-200 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}>
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          {navLink.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full py-2 hover:bg-teal-100 transition"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 hover:bg-teal-100 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;
