'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is FloZap?",
    answer: "FloZap is an all-in-one platform that allows you to buy virtual numbers, eSIMs, sell your USDT crypto, exchange gift cards for cash, and pay for various services securely and conveniently.",
  },
  {
    question: "How do I buy a virtual number on FloZap?",
    answer: "Login to your FloZap account, go to the Virtual Number section, choose your preferred country and app service (WhatsApp, Telegram, etc.), and purchase instantly.",
  },
  {
    question: "Can I sell my USDT on FloZap?",
    answer: "Yes, you can sell your USDT (Tether) securely at competitive rates and receive payment quickly into your preferred bank account or wallet.",
  },
  {
    question: "Does FloZap provide eSIM services?",
    answer: "Absolutely. FloZap offers eSIMs for data and calls, allowing you to stay connected globally without the need for physical SIM cards.",
  },
  {
    question: "Can I exchange my gift cards for cash on FloZap?",
    answer: "Yes. FloZap allows you to exchange various gift cards for cash easily and securely with fast payout times.",
  },
  {
    question: "Is FloZap secure to use?",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },
];



const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-[70rem] mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-700">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white cursor-pointer rounded-md shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium text-sm sm:text-base md:text-lg focus:outline-none"
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 text-sm sm:text-base"
                  >
                    <div>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
