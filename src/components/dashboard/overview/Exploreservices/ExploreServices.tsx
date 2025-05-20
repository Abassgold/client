import React from 'react'
import ExploreCard from './ExploreCard'

const ExploreServices = () => {
  const services = [
        { name: "Utility Payments", icon: "💡", link: "utilities" },
        { name: "Recharge & Subscriptions", icon: "📱", link: "recharge" },
        { name: "Crypto Trading", icon: "₿", link: "crypto" },
        { name: "Gift Cards", icon: "🎁", link: "giftcards" },
        { name: "Virtual Numbers", icon: "📞", link: "virtualnumbers" },
      ];
  return (
    <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Explore Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {services.map((service) => (
                <ExploreCard
                  key={service.link}
                  title={service.name}
                  icon={service.icon}
                  link={service.link}
                  // onClick={() => setActiveSection(service.id)}
                />
              ))}
            </div>
          </div>
  )
}

export default ExploreServices