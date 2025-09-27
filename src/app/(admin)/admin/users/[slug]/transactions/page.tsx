'use client'

import React, { useEffect, useState } from 'react';
import { RefreshCw, Eye } from 'lucide-react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/Token';
import { toast } from 'react-toastify';
import DatePicker from '@/lib/datePicker/DatePicker';
import PaginationWrapper from '@/components/pagination/PaginationWrapper';
type Transaction = {
  _id: string;
  reference: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  balB4?: number;
  balAF?: number;
};

interface FetchTransactionResponse {
  ok: true;
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  msg?: string;
  
}

const TransactionsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<FetchTransactionResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/${params.slug}/transactions`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
  }, [page, statusFilter, dateFrom, dateTo]);
  return (
    <div className="relative text-xs sm:text-sm md:text-base">
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          Transactions
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <Select
            onValueChange={(value) => {
              if (value === 'all') {
                setStatusFilter('');
              } else {
                setStatusFilter(value);
              }
              setPage(1);
            }}
          >
            <SelectTrigger className="border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 w-full sm:w-auto">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Date Pickers */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DatePicker
              setDate={(value) => {
                setDateFrom(value);
                setPage(1);
              }}
              date={dateFrom}
              select="From"
            />
            <DatePicker
              setDate={(value) => {
                setDateTo(value);
                setPage(1);
              }}
              date={dateTo}
              select="To"
            />
          </div>

          {/* Refresh Button */}
          <div className="w-full sm:w-auto">
            <Button
              onClick={fetchTransactions}
              className="bg-teal-700 hover:bg-teal-800 text-white w-full sm:w-auto flex justify-center items-center gap-2"
            >
              <RefreshCw size={16} /> Refresh
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md whitespace-nowrap">
            <thead className="bg-teal-800 text-white text-xs sm:text-sm md:text-base">
              <tr>
                <th className="px-2 py-3 text-left">Ref No.</th>
                <th className="px-2 py-3 text-left">Amount</th>
                <th className="px-2 py-3 text-left">Type</th>
                <th className="px-2 py-3 text-left">Status</th>
                <th className="px-2 py-3 text-left">balB4</th>
                <th className="px-2 py-3 text-left">balAF</th>
                <th className="px-2 py-3 text-left">Date</th>
                <th className="px-2 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm md:text-base">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, index) => (
                  <tr
                    key={tx._id}
                    className={`border-t hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <td className="px-2 py-3">{tx.reference}</td>
                    <td className="px-2 py-3">₦{tx.amount.toFixed(2)}</td>
                    <td
                      className={`px-2 py-3 ${tx.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {tx.type}
                    </td>
                    <td
                      className={`px-2 py-3 font-medium ${tx.status === "completed"
                        ? "text-green-600"
                        : tx.status === "pending"
                          ? "text-yellow-600"
                          : tx.status === "refunded"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                    >
                      {tx.status}
                    </td>
                    <td className="px-2 py-3">₦{tx.balB4?.toFixed(2)}</td>
                    <td className="px-2 py-3">₦{tx.balAF?.toFixed(2)}</td>
                    <td className="px-2 py-3">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                    <td className="px-2 py-3 flex gap-2">
                      <Link
                        href={`/user/transactions/${tx._id}`}
                        className="text-teal-700 hover:underline"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <PaginationWrapper page={page} totalPages={totalPages} setPage={setPage} />

        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
