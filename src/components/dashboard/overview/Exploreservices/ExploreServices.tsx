import React from 'react'
import ExploreCard from './ExploreCard'

const ExploreServices = () => {
  const services = [
        { name: "Virtual Numbers", icon: "📞", link: "/user/virtual-number" },
        { name: "eSIM", icon: "📱", link: "/user/esim" },
        { name: "Sell Crypto", icon: "₿", link: "/user/crypto" },
        { name: "Gift Cards", icon: "🎁", link: "/user/giftcards" },
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