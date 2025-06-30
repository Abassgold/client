'use client';
import { motion } from "framer-motion";
import FeturesCard from "./FeturesCard";

const Features = () => {
  const features = [
    {
      title: "Online Banking",
      description: "Securely manage your accounts, transfer funds, and track transactions.",
      icon: "🏦",
    },
    {
      title: "Utility Payments",
      description: "Pay electricity, water, and other bills in just a few clicks.",
      icon: "💡",
    },
    {
      title: "Recharge & Subscriptions",
      description: "Top up mobile plans and manage streaming subscriptions effortlessly.",
      icon: "📱",
    },
    {
      title: "Crypto Trading",
      description: "Easily sell your cryptocurrency to us at competitive rates with real-time market data.",
      icon: "₿",
    },
    {
      title: "Virtual Number",
      description: "Obtain a virtual phone number for SMS verifications on platforms like WhatsApp, Telegram, or other apps. Protect your privacy by using it for account creation, online services, and secure transactions without sharing your personal number.",
      icon: "📞",
    },
    {
      title: "Gift Cards",
      description: "Exchange your gift cards for cash quickly and securely.",
      icon: "🎁",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-[70rem] mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-700"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeturesCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
