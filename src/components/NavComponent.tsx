'use client';
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavHeader = () => {
  const navLink = [
    { name: 'Features', link: '#features' },
    { name: 'About Us', link: '#about-us' },
    { name: 'Contact Us', link: '#contact-us' },
    { name: 'FAQ', link: '#faq' },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white px-4 py-3 sticky top-0 z-50 shadow-md text-gray-600">
      <div className="max-w-[70rem] mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">FloZap</h1>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-4 text-sm sm:text-base md:text-lg">
          {navLink.map((item, index) => (
            <Link href={item.link} key={index}>{item.name}</Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-4 text-sm sm:text-base md:text-lg">
          <Link href='/login' className="text-teal-800">Login</Link>
          <Link href='/register' className="py-2 px-4 md:py-3 md:px-6 rounded-full bg-teal-600 hover:bg-teal-800 text-white duration-300">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          className="sm:hidden p-2 bg-teal-700 text-white rounded-lg text-xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden fixed top-[4.5rem] left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs rounded-lg z-40 bg-white shadow-md border border-zinc-200"
          >
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              {navLink.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 hover:bg-teal-100 transition text-base"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:bg-teal-100 transition text-base"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition text-base"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavHeader;
