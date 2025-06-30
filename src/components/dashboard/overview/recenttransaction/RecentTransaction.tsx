'use client'
import React, { useEffect, useState } from 'react'
import TransactionCard from './TransactionCard'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import RecentTransactionSkeleton from './RecentTransactionSkelton'
import { transactionType } from '../../transactions/TransactionList'



export interface WalletResponse {
    ok: boolean
    msg?: string
    balance?: number
    transactions?: transactionType[]
}

const RecentTransaction = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isBalanceVisible, setIsBalanceVisible] = useState(true)
    const [transactions, setTransactions] = useState<transactionType[]>([])
    const [walletBalance, setWalletBalance] = useState<number>(0)

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('accessToken='))
            ?.split('=')[1]

        if (!token) return
        setLoading(true);
        const fetchDashboardData = async (): Promise<void> => {
            try {
                const { data } = await axios.get<WalletResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!data.ok || data.transactions?.length == 0) {
                    setTransactions([])
                    setWalletBalance(0)
                    return
                }

                setTransactions(data.transactions || [])
                setWalletBalance(data.balance || 0)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error fetching dashboard data:', error.message)
                    return
                }
                console.error('Unknown Error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])
    if (loading) return <RecentTransactionSkeleton />

    return (
        <div className="mb-6">

            <h3 className="text-xl font-[600] mb-4 text-gray-800">Wallet Overview</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold text-gray-800">Wallet Balance</h4>
                            <button
                                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                                className="text-gray-500 cursor-pointer hover:text-gray-700"
                            >
                                {isBalanceVisible ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-teal-600">
                            {isBalanceVisible
                                ? `₦${walletBalance.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`
                                : '******'}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                            href='/deposit'
                            className="bg-teal-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-teal-500"
                        >
                            Fund Wallet
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-[600] mb-2 text-gray-800">Recent Wallet Transactions</h4>
                    <div className="space-y-2">
                        {transactions.length === 0 ? (
                            <div className="text-center mt-6">
                                <h3 className="text-xl font-semibold text-red-800 mb-2">No Recent Transactions</h3>
                                <p className="text-gray-500">You haven’t made any transactions yet.</p>
                            </div>
                        ) : (
                            transactions.slice(0, 3).map((t) => (
                                <TransactionCard
                                    key={t.reference}
                                    description={t.remarks || t.serviceType}
                                    amount={t.amount.toFixed(2)}
                                    type={t.type}
                                />
                            ))
                        )}
                        {transactions.length > 0 && (
                            <Link href="/transactions" className="text-teal-600 hover:underline text-sm mt-2 block ">
                                View All
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentTransaction
