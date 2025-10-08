'use client'
import React, { useEffect, useState } from 'react';
import { PhoneIcon, WifiIcon, CreditCardIcon, WalletIcon, TvIcon, ZapIcon, RefreshCcwIcon, MessageSquareIcon, ArrowRightIcon, GlobeIcon, DollarSignIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Badge } from '../ui copy/Badge';
import { TransactionHistory } from '../dashboard/dashboard/TransactionHistory';
import Link from 'next/link';
import axios from 'axios';
import { getToken } from '@/lib/Token';
import { useAppSelector } from '@/redux/hooks';

type transactionType = {
  reference: string;
  serviceType: string;
  amount: number;
  type: "credit" | "debit";

}
export interface WalletResponse {
  ok: boolean;
  msg?: string;
  balance: number;
  transactions?: transactionType[];
}
const UserDashboard: React.FC = () => {
  const quickActions = [{
    icon: <PhoneIcon size={24} />,
    title: 'Airtime',
    path: '/user/airtime',
    color: 'bg-blue-500' 
  }, {
    icon: <WifiIcon size={24} />,
    title: 'Data',
    path: '/user/data',
    color: 'bg-green-500'
  }, {
    icon: <GlobeIcon size={24} />,
    title: 'Virtual Number',
    path: '/user/virtual-number',
    color: 'bg-indigo-500'
  }, {
    icon: <DollarSignIcon size={24} />,
    title: 'eSIM',
    path: '/user/esim',
    color: 'bg-purple-500'
  }, {
    icon: <DollarSignIcon size={24} />,
    title: 'USDT',
    path: '/user/usdt',
    color: 'bg-emerald-500'
  }, {
    icon: <TvIcon size={24} />,
    title: 'Cable TV',
    path: '/user/cable-tv',
    color: 'bg-purple-500'
  }, {
    icon: <ZapIcon size={24} />,
    title: 'Electricity',
    path: '/user/electricity',
    color: 'bg-yellow-500'
  }, {
    icon: <RefreshCcwIcon size={24} />,
    title: 'Airtime to Cash',
    path: '/user/airtime-to-cash',
    color: 'bg-orange-500'
  }, {
    icon: <MessageSquareIcon size={24} />,
    title: 'Bulk SMS',
    path: '/user/bulk-sms',
    color: 'bg-pink-500'
  }];
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const user = useAppSelector((state) => state.auth.user.user)
  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        setLoading(true)
        const { data } = await axios.get<WalletResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        );

        if (!data.ok) {
          setTransactions([]);
          setBalance(0);
          return;
        }

        setTransactions(data.transactions || []);
        setBalance(data.balance || 0);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching dashboard data:', error.message);
        } else {
          console.error('Unknown Error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className='dark:text-white'>Loading...</div>;

  return <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#1f2229] dark:text-white">
          Dashboard
        </h1>
        <p className="text-[#7e8aa4] dark:text-[#b1bdd7]">
          Welcome back, <span className=' capitalize'>{user?.firstName} {user?.lastName}</span>
        </p>
      </div>
      <Link href="/user/deposit">
        <Button className='bg-teal-900'>Add Funds</Button>
      </Link>
    </div>
    {/* Stats Overview */}
    <Card className="overflow-hidden border-2 border-teal-100 dark:border-teal-900/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 dark:bg-teal-900/20 rounded-full -mt-16 -mr-16 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-50 dark:bg-teal-900/10 rounded-full -mb-12 -ml-12 opacity-70"></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-1">
              <WalletIcon
                size={18}
                className="text-teal-700 dark:text-teal-400 mr-2"
              />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Available Balance
              </p>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              ₦{balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </h3>
            <div className="flex items-center mt-1">
              <Badge variant="success" className="mr-2">
                +12%
              </Badge>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                from last month
              </p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white">
            <CreditCardIcon size={28} />
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Link href="/user/deposit" className="flex-1">
            <Button variant="outline" className="w-full">
              Fund Wallet
            </Button>
          </Link>
          <Link href="/user/transactions" className="flex-1">
            <Button variant="outline" className="w-full">
              Transactions
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action, index) => <Link key={index} href={action.path} className="flex flex-col items-center p-4 rounded-lg border border-slate-200 dark:border-[#3f4552] hover:border-teal-500 dark:hover:border-teal-600 transition-colors">
            <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white mb-3`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-[#1f2229] dark:text-white">
              {action.title}
            </span>
          </Link>)}
        </div>
      </CardContent>
    </Card>

    <div className="">

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Link href="/user/transactions">
            <Button variant="ghost" size="sm">
              View all <ArrowRightIcon size={14} className="ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold text-red-800 mb-2">No Recent Transactions</h3>
              <p className="text-gray-500">You haven’t made any transactions yet.</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t.reference} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <TransactionHistory
                  reference={t.reference}
                  serviceType={t.serviceType}
                  amount={t.amount}
                  type={t.type}
                  status='successful'
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  </div>;
};

export default UserDashboard;