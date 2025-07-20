import Link from "next/link";
import { quicklinks } from "./list";

const Footer = () => {
  return (
    <footer
      className="bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#111827)] text-gray-300 py-12 px-4"
    >
      <section className="max-w-[70rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">FloZap</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform to sell crypto, sell gift cards, and get virtual numbers & activate your eSIMs
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quicklinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-12">
          <div className="border-t border-gray-700 mb-4"></div>
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} FloZap. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
