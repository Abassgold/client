import React from 'react'

const Quickactions = () => {
  return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
                <div className="text-2xl">💡</div>
                <span className="font-semibold">Pay a Bill</span>
              </button>
              <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
                <div className="text-2xl">₿</div>
                <span className="font-semibold">Buy/Sell Crypto</span>
              </button>
              <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
                <div className="text-2xl">🎁</div>
                <span className="font-semibold">Buy/Sell Gift Card</span>
              </button> */}

              <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
      <div className="text-2xl">📱</div>
      <span className="font-semibold">Airtime & Data</span>
    </button>

    <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
      <div className="text-2xl">📺</div>
      <span className="font-semibold">TV Subscription</span>
    </button>

    <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
      <div className="text-2xl">📘</div>
      <span className="font-semibold">Exam Checker</span>
    </button>

    <button className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 hover:bg-teal-50 transition">
      <div className="text-2xl">⚡</div>
      <span className="font-semibold">Utility Bills</span>
    </button>

            </div>
          </div>
  )
}

export default Quickactions