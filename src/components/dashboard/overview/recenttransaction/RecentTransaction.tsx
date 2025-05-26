'use client'
import React, { useState } from 'react'
import TransactionCard from './TransactionCard';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const RecentTransaction = () => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    // const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const walletBalance = 12345.67;
    const walletTransactions = [
        { description: "Deposit from Bank", amount: "5000.00", type: "credit" },
        { description: "Utility Payment", amount: "45.00", type: "debit" },
        { description: "Crypto Exchange", amount: "200.00", type: "credit" },
    ];
    return (
        <div className="mb-6">
            <h3 className="text-xl font-[600] mb-4 text-gray-800">Wallet Overview</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className=' flex items-center gap-2 mb-1'>
                        <h4 className="text-lg font-semibold text-gray-800">Wallet Balance</h4>
                            <button
                                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                {isBalanceVisible ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        <div className="flex justify-between  gap-2">
                            <p className="text-3xl font-bold text-teal-600">
                                {isBalanceVisible ? `$${walletBalance.toFixed(2)}` : '******'}
                            </p>
                            

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            onClick={() => setIsDepositOpen(true)}
                            className="bg-teal-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-teal-500"
                        >
                            Fund Wallet
                        </button>
                        {/* <button
                            onClick={() => setIsWithdrawOpen(true)}
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                        >
                            Withdraw
                        </button> */}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-[600] mb-2 text-gray-800">Recent Wallet Transactions</h4>
                    <div className="space-y-2">
                        {walletTransactions.map((t, index) => (
                            <TransactionCard
                                key={index}
                                description={t.description}
                                amount={t.amount}
                                type={t.type}
                            />
                        ))}
                        <Link href='/dashboard/transaction' className="text-teal-600 hover:underline text-sm mt-2 block">
                            View All
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentTransaction