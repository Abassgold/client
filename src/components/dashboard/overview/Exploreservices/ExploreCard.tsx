import Link from 'next/link'
import React from 'react'
interface exploreType {
    title: string;
    icon: string;
    link: string;
}
const ExploreCard = ( {title, icon, link}:exploreType) => {
  return (
    <Link
    href={link}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg hover:bg-teal-50 transition"
        >
          <div className="text-3xl sm:text-4xl mb-2">{icon}</div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-800">{title}</h4>
        </Link>
  )
}

export default ExploreCard