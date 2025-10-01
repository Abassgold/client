'use client';
import { motion } from "framer-motion";
import FeturesCard from "./FeturesCard";
import { PhoneIcon, WifiIcon, TvIcon, ZapIcon, MessageSquareIcon, GlobeIcon, RefreshCcwIcon, DollarSignIcon } from 'lucide-react';


const Features = () => {
 const features = [{
    icon: <PhoneIcon size={24} className="text-white" />,
    title: 'Airtime Recharge',
    description: 'Instantly recharge airtime for all major networks with the best rates and instant delivery.',
    color: 'bg-blue-600'
  }, {
    icon: <WifiIcon size={24} className="text-white" />,
    title: 'Data Bundles',
    description: 'Purchase data bundles for all networks at competitive prices with instant activation.',
    color: 'bg-green-600'
  }, {
    icon: <TvIcon size={24} className="text-white" />,
    title: 'Cable TV',
    description: 'Pay for your DSTV, GOTV, and Startimes subscriptions quickly and hassle-free.',
    color: 'bg-purple-600'
  }, {
    icon: <ZapIcon size={24} className="text-white" />,
    title: 'Electricity Bills',
    description: 'Pay electricity bills for all distribution companies and get your token instantly.',
    color: 'bg-yellow-600'
  }, {
    icon: <RefreshCcwIcon size={24} className="text-white" />,
    title: 'Airtime to Cash',
    description: 'Convert your excess airtime to cash at the best rates in the market.',
    color: 'bg-red-600'
  }, {
    icon: <MessageSquareIcon size={24} className="text-white" />,
    title: 'Bulk SMS',
    description: 'Send bulk SMS to your customers, employees, or audience with our reliable SMS gateway.',
    color: 'bg-indigo-600'
  }, {
    icon: <GlobeIcon size={24} className="text-white" />,
    title: 'Virtual Number',
    description: 'Get a virtual phone number for your business or personal use with our easy-to-use platform.',
    color: 'bg-pink-600'
  }, {
    icon: <DollarSignIcon size={24} className="text-white" />,
    title: 'USDT Payments',
    description: 'Make and receive payments in USDT cryptocurrency with low transaction fees.',
    color: 'bg-teal-600'
  }];

  return (
    <section id="features" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-700"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                color={feature.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Features;
