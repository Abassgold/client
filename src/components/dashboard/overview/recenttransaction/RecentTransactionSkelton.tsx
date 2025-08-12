import React from 'react'

const RecentTransactionSkeleton = () => {
  return (
    <div className="mb-6 animate-pulse">
      <h3 className="text-xl font-[600] mb-4 text-gray-800">Wallet Overview</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-5 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 w-40 bg-gray-300 rounded"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="bg-gray-300 h-10 w-32 rounded-lg"></div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-[600] mb-2 text-gray-800">Recent Wallet Transactionsooo</h4>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-12 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentTransactionSkeleton
