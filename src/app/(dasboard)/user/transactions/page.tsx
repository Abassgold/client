'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getToken } from '@/lib/Token';
import DatePicker from '@/lib/datePicker/DatePicker';
type Transaction = {
  _id: string;
  reference: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  serviceType: string;
};

interface FetchTransactionResponse {
  ok: true;
  transactions: Transaction[];
  totalPages: number;
  currentPage: number;
  msg?: string;
}
import {
  RefreshCcwIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui copy/Card';
import { Button } from '@/components/ui copy/Button';
import { Badge } from '@/components/ui copy/Badge';
import { toast } from 'sonner';


const Transactions = () => {
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
  }, [page, statusFilter, dateFrom, dateTo])
  const statusOptions = [
    {
      value: 'All Status',
      label: 'All Status',
    },
    {
      value: 'completed',
      label: 'Completed',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'failed',
      label: 'Failed',
    },
    {
      value: 'refunded',
      label: 'Refunded',
    },
  ]
  useEffect(() => {
    fetchTransactions()
  }, [page, statusFilter, dateFrom, dateTo])
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'failed':
        return <Badge variant="danger">Failed</Badge>
      case 'refunded':
        return <Badge variant="info">Refunded</Badge>
      default:
        return <Badge variant="teal">Unknown</Badge>
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-900 dark:text-white">
          Transactions
        </h1>
      </div>
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter transactions by status and date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
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
                <SelectTrigger className="border rounded-md  focus:outline-none focus:ring-2 focus:ring-teal-600 sm:w-auto">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOptions.map((item, index) => (
                      <SelectItem value={item.label} key={index}>{item.value}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
            <div>
              <DatePicker
                setDate={(value) => {
                  setDateFrom(value);
                  setPage(1);
                }}
                date={dateFrom}
                select="From"
              />
            </div>
            <div>
              <DatePicker
                setDate={(value) => {
                  setDateTo(value);
                  setPage(1);
                }}
                date={dateTo}
                select="To"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={fetchTransactions}
                className="flex items-center gap-2"
                fullWidth
              >
                <RefreshCcwIcon size={16} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Transactions Table */}
      <Card className='dark:text-white'>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your recent transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 dark:bg-secondary-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Ref No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-4 text-center text-secondary-500"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-4 text-center text-secondary-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className={`hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-100/50 dark:bg-slate-800/30'}`}
                    >
                      <td className="px-4 py-4 text-sm text-secondary-900 dark:text-white">
                        {transaction.reference}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={`flex items-center ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeftIcon
                              size={14}
                              className="mr-1 text-green-600 dark:text-green-400"
                            />
                          ) : (
                            <ArrowUpRightIcon
                              size={14}
                              className="mr-1 text-red-600 dark:text-red-400"
                            />
                          )}
                          {transaction.type === 'credit' ? '+' : '-'}₦
                          {transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-4 text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </td>
                      <td className="px-4 py-4 text-sm text-secondary-900 dark:text-white">
                        {transaction.serviceType}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="px-4 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <Link
                          href={`/user/transactions/${transaction._id}`}
                          className="text-teal-700 hover:text-teal-800 dark:text-teal-500 dark:hover:text-teal-400"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            Showing page {page} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Transactions;