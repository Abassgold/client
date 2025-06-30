'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const ChooseDepositMethod = () => {
  const router = useRouter()

  const handleSelect = (method: 'paystack' | 'crypto') => {
    router.push(method === 'paystack' ? '/deposit/paystack' : '/deposit/crypto')
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 max-w-md w-full text-center">
        <h1 className="text-xl sm:text-2xl font-semibold md:font-bold text-gray-700 mb-6">
          Choose a Deposit Method
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Paystack Button */}
          <button
            onClick={() => handleSelect('paystack')}
            className=" cursor-pointer w-full border border-gray-300 rounded-lg p-4 hover:border-teal-500 transition "
          >
            <div className="flex justify-center">
              <img
                src="https://verifyasap.com/images/paystack.png"
                alt="PayStack"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </button>

          {/* USDT Button */}
          <button
            onClick={() => handleSelect('crypto')}
            className="w-full border border-gray-300 rounded-lg p-4 hover:border-teal-500 transition cursor-pointer"
          >
            <div className="flex justify-center">
              <img
                src="https://verifyasap.com/images/crypto.png"
                alt="USDT"
                className="h-10 sm:h-12 md:h-14  w-auto object-contain"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChooseDepositMethod
