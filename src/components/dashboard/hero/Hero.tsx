'use client';
import Link from "next/link";
import './hero.css';
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-white">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-white to-teal-50 opacity-70 pointer-events-none"></div>

      <div className="relative max-w-[70rem] mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-teal-800 to-teal-600 bg-clip-text text-transparent">
            Your All-in-One <br className="hidden sm:block" /> Financial Solution
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
            Manage Payments, Subscriptions, Crypto, Gift Cards, and Virtual Numbers seamlessly with FloZap.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              href="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full text-sm sm:text-base md:text-lg shadow-md transition"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="bg-white border border-teal-600 text-teal-700 px-6 py-3 rounded-full text-sm sm:text-base md:text-lg hover:bg-gray-100 transition"
            >
              Explore
            </Link>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src="./heropic.png"
            alt="A woman happily using FloZap"
            width={800}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

{/* Call to action below hero */}
      

    </section>
  );
};

export default Hero;
