'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui copy/Card'
 const Deposit = () => {
  const router = useRouter()
  const handleSelect = (
    method: 'account-details' | 'crypto' | 'korapay' | 'etegram',
  ) => {
    router.push(`/user/deposit/${method}`)
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Fund Your Wallet
        </h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">
            Choose a Deposit Method
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              onClick={() => handleSelect('account-details')}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-teal-500 dark:hover:border-teal-600 transition cursor-pointer bg-white dark:bg-slate-800"
            >
              <div className="flex justify-center">
                <img
                  src="/paymentPoint.png"
                  alt="Account Details"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              </div>
            </div>
            <div
              onClick={() => handleSelect('crypto')}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-teal-500 dark:hover:border-teal-600 transition cursor-pointer bg-white dark:bg-slate-800"
            >
              <div className="flex justify-center">
                <img
                  src="/crypto-image.png"
                  alt="USDT"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              Why Fund Your Wallet?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Quick Transactions
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Pay for services instantly without entering payment details
                    every time
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Special Discounts
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get access to exclusive promotions and discounts for wallet
                    users
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Track Your Spending
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Easily monitor your transactions and manage your budget
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default Deposit;