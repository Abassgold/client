'use client'

import React, { useEffect, useState } from 'react';
import { RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/Token';
type Transaction = {
  _id: string;
  reference: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
};

interface FetchTransactionResponse {
  ok: true;
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  msg?: string;
}

const TransactionsPage = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<FetchTransactionResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/me`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          page,
          limit: 10,
          status: statusFilter,
          dateFrom,
          dateTo
        }
      });
      if (!data.ok) {
        setTransactions([]);
        setTotalPages(1);
      } else {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) return router.push('/login');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page,  statusFilter, dateFrom, dateTo]);

 

  return (
    <div className='relative text-sm'>
      <Toaster richColors position='top-center' duration={2000} />

      <div className=''>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Transactions</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <div>
            <label htmlFor="dateFrom">From</label>
            <input
            type="date"
            value={dateFrom}
            placeholder='From'
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            className="p-2 ms-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          </div>
          <div>
            <label htmlFor="dateTo">To</label>
                      <input
            type="date"
            value={dateTo}
            placeholder='To'
            onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
            className="p-2 ms-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          </div>



          <Button onClick={fetchTransactions} className="bg-teal-700 hover:bg-teal-800 text-white">
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md whitespace-nowrap">
            <thead className="bg-teal-800 text-white">
              <tr>
                <th className="px- py-3 text-left">Ref No.</th>
                <th className="px-1 py-3 text-left">Amount</th>
                <th className="px-1 py-3 text-left">Type</th>
                <th className="px-1 py-3 text-left">Status</th>
                <th className="px-1 py-3 text-left">Date</th>
                <th className="px-1 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">Loading...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">No transactions found.</td>
                </tr>
              ) : transactions.map((tx, index) => (
                <tr key={tx._id}  className={`border-t hover:bg-gray-100 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}>
                  <td className="px-2 py-3">{tx.reference}</td>
                  <td className="px-2 py-3">₦{tx.amount.toFixed(2)}</td>
                  <td className="px-2 py-3">{tx.type}</td>
                  <td className={`px-2 py-3 font-medium ${
                    tx.status === 'completed' ? 'text-green-600' :
                    tx.status === 'pending' ? 'text-yellow-600' :
                    tx.status === 'refunded' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {tx.status}
                  </td>
                  <td className="px-2 py-3">{new Date(tx.createdAt).toLocaleString()}</td>
                  <td className="px-2 py-3 flex gap-2">
                    <Link href={`/transactions/${tx._id}`} className="text-teal-700 hover:underline">
                    <Eye size={16}/>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination className='text-teal-800'>
            <PaginationContent>
              <PaginationItem>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                  <PaginationPrevious href="#" />
                </button>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <button onClick={() => setPage(i + 1)}>
                    <PaginationLink href="#" isActive={page === i + 1}>{i + 1}</PaginationLink>
                  </button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                  <PaginationNext href="#" />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
