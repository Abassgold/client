'use client';
import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from 'lucide-react'

const NavHeader = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLink = [
    { name: 'Features', link: '#features' },
    { name: 'About Us', link: '#about-us' },
    { name: 'Contact Us', link: '#contact-us' },
    { name: 'FAQ', link: '#faq' },
  ];


  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="#" className="text-xl font-bold text-teal-800">
              FloZap
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-base font-medium text-gray-500 hover:text-teal-800"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center">
            <Link
              href="/login"
              className="text-base font-medium text-gray-500 hover:text-teal-800 mr-4"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-800 hover:bg-teal-700"
            >
              Sign up
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white z-50">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {navLink.map((Item, index) => (
              <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                key={index}
                href={Item.link}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-800 hover:bg-gray-50"
              >
                {Item.name}
              </Link>
            ))}

            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium  hover:text-teal-800 text-teal-700 bg-teal-100 hover:bg-teal-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-800 hover:bg-teal-700 mt-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>

  );
};

export default NavHeader;
