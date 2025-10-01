import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
const Footer: React.FC = () => {
  return <footer className="bg-[#111827] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_#111827)] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-teal-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="ml-3 font-bold text-xl text-white">FloZap</span>
          </div>
          <p className="text-secondary-400 mb-6">
            Your trusted platform for airtime, data, bill payments, and exam checks — plus crypto exchange, gift card trading, virtual numbers, and eSIM activation.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61581521841453" className="text-secondary-400 hover:text-primary-500">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/FloZapofficial" className="text-secondary-400 hover:text-primary-500">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/kola.devjs/?utm_source=qr&r=nametag" className="text-secondary-400 hover:text-primary-500">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@_flozap_t=ZS-90CAWz9fEo5&_r=1" className="text-secondary-400 hover:text-primary-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.75 2c.875.75 1.925 1.275 3.1 1.45V7c-.9-.1-1.775-.4-2.575-.875v5.55c0 2.875-2.325 5.225-5.2 5.225C5.1 16.9 2.75 14.55 2.75 11.675c0-2.85 2.325-5.175 5.175-5.175.375 0 .725.05 1.075.125v3.05c-.35-.15-.725-.25-1.125-.25-1.325 0-2.4 1.075-2.4 2.375 0 1.325 1.075 2.4 2.4 2.4 1.3 0 2.375-1.075 2.375-2.4V2h2.5z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6">Services</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Airtime Recharge
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Data Bundles
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Cable TV
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Electricity Bills
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Bulk SMS
              </Link>
            </li>
            <li>
              <Link href="#features" className="text-secondary-400 hover:text-primary-500">
                Virtual Number
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6">Company</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                Press
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                Partners
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-400 hover:text-primary-500">
                Legal
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin size={18} className="text-primary-500 mr-2 mt-0.5" />
              <span className="text-secondary-400">
                123 Innovation Drive, Tech District, Lagos, Nigeria
              </span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="text-primary-500 mr-2" />
              <a href="tel:+2348103875405" className="text-secondary-400 hover:text-primary-500">
                +2348103875405
              </a>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="text-primary-500 mr-2" />
              <a href="mailto:flozapofficial@gmail.com" className="text-secondary-400 hover:text-primary-500">
                flozapofficial@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-secondary-400 text-sm">
          © {new Date().getFullYear()} FloZap. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="text-secondary-400 hover:text-primary-500 text-sm">
            Privacy Policy
          </Link>
          <Link href="#" className="text-secondary-400 hover:text-primary-500 text-sm">
            Terms of Service
          </Link>
          <Link href="#" className="text-secondary-400 hover:text-primary-500 text-sm">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footer;