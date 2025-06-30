'use client';

import React, { useMemo, useState } from 'react';
import { TransactionTable } from './TransactionTable';
 

export interface transactionType {
    sender: string;
    transactionId: string;
    reference?: string;
    beneficiary: string;
    serviceType: string;
    amount: number;
    fee: number;
    status: 'completed' | 'failed' | 'pending' | 'refunded';
    type: 'debit' | 'credit';
    remarks: string;
    details: {
        network?: string;
        plan?: string;
        meterNumber?: string;
        [key: string]: string | undefined;
    };
    updatedAt: Date | string;
}

export type transactionArray = {
    transaction: transactionType[];
};

const TransactionList = ({ transaction }: transactionArray) => {
    console.log('Transaction List:', transaction);
    
    const SORT_OPTIONS = [
        { label: 'Date (Newest)', value: 'date_desc' },
        { label: 'Date (Oldest)', value: 'date_asc' },
        { label: 'Amount (High to Low)', value: 'amount_desc' },
        { label: 'Amount (Low to High)', value: 'amount_asc' },
    ];

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [sortOption, setSortOption] = useState('date_desc');

    const filteredTransactions = useMemo(() => {
        const filtered = transaction.filter((txn) => {
            const searchLower = search.toLowerCase();
            if (
                search &&
                !(
                    txn.beneficiary.toLowerCase().includes(searchLower) ||
                    (txn.remarks && txn.remarks.toLowerCase().includes(searchLower))
                )
            ) {
                return false;
            }

            if (
                statusFilter &&
                txn.status.toLowerCase() !== statusFilter.toLowerCase()
            ) {
                return false;
            }

            if (
                serviceFilter &&
                txn.serviceType.toLowerCase() !== serviceFilter.toLowerCase()
            ) {
                return false;
            }

            return true;
        });

        // Sort
        switch (sortOption) {
            case 'date_asc':
                filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
                break;
            case 'date_desc':
                filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                break;
            case 'amount_asc':
                filtered.sort((a, b) => a.amount - b.amount);
                break;
            case 'amount_desc':
                filtered.sort((a, b) => b.amount - a.amount);
                break;
        }

        return filtered;
    }, [transaction, search, statusFilter, serviceFilter, sortOption]);

    return (
        <div className="min-h-screen bg-white rounded-md ">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                Transaction History
            </h1>

            {/* Filters and Search */}
            <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input
                    type="text"
                    placeholder="Search by beneficiary or remarks..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                    }}
                    className="px-4 py-2 border rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-800"
                >
                    <option value="">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                </select>

                <select
                    value={serviceFilter}
                    onChange={(e) => {
                        setServiceFilter(e.target.value);
                    }}
                    className="px-4 py-2 border rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-800"
                >
                    <option value="">All Services</option>
                    {[...new Set(transaction.map((t) => t.serviceType))].map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOption}
                    onChange={(e) => {
                        setSortOption(e.target.value);
                    }}
                    className="px-4 py-2 border rounded-md bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-800"
                >
                    {SORT_OPTIONS.map(({ label, value }) => (
                        <option key={value} value={value} className="text-gray-700">
                            Sort by {label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table Section */}
            {filteredTransactions.length === 0 ? (
                <p className="text-center text-gray-700 text-xl md:text-3xl font-semibold mt-4">
                    No transactions found.
                </p>
            ) : (
                <div className="w-full overflow-x-auto rounded-md shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-teal-800">
                            <tr>
                                <th className="px-4 py-2 text-left text-white font-bold whitespace-nowrap">Transaction ID</th>
                                <th className="px-4 py-2 text-left text-white font-bold whitespace-nowrap">Date</th>
                                <th className="px-4 py-2 text-left text-white font-bold whitespace-nowrap">Amount</th>
                                <th className="px-4 py-2 text-left text-white font-bold whitespace-nowrap">Fee</th>
                                <th className="px-4 py-2 text-left text-white font-bold whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((txn, index) => (
                                <TransactionTable key={index} transaction={txn} />
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
};

export default TransactionList;
