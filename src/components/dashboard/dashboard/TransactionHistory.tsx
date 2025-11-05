'use client';
import React from 'react';
import {
  PhoneIcon,
  WifiIcon,
  TvIcon,
  ZapIcon,
  RefreshCcwIcon,
  MessageSquareIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui copy/Badge';
import Link from 'next/link';

type TransactionType = {
  reference: string;
  serviceType: string;
  amount: number;
  id: string;
  updatedAt: Date;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  remarks: string;
};

export const TransactionHistory: React.FC<TransactionType> = ({
  reference,
  serviceType,
  amount,
  type,
  status,
  updatedAt,
  id,
  remarks,
}) => {
  const getStatusBadge = (status: TransactionType['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant='success'>Successful</Badge>;
      case 'pending':
        return <Badge variant='warning'>Pending</Badge>;
      case 'failed':
        return <Badge variant='danger'>Failed</Badge>;
      default:
        return <Badge variant='slate'>Unknown</Badge>;
    }
  };

  const getIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'Airtime':
        return <PhoneIcon size={16} />;
      case 'Data':
        return <WifiIcon size={16} />;
      case 'Virtual Number':
        return <TvIcon size={16} />;
      case 'eSIM':
        return <ZapIcon size={16} />;
      case 'USDT':
        return <MessageSquareIcon size={16} />;
      case 'Cable TV':
        return <TvIcon size={16} />;
      case 'Electricity':
        return <ZapIcon size={16} />;
      case 'Airtime to Cash':
        return <RefreshCcwIcon size={16} />;
      case 'Bulk SMS':
        return <MessageSquareIcon size={16} />;
      default:
        return <PhoneIcon size={16} />;
    }
  };

  const getIconBg = (serviceType: string) => {
    switch (serviceType) {
      case 'Airtime':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'Data':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'Virtual Number':
        return 'bg-indigo-100 dark:bg-indigo-900/30';
      case 'eSIM':
        return 'bg-purple-100 dark:bg-purple-900/30';
      case 'USDT':
        return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'Cable TV':
        return 'bg-purple-100 dark:bg-purple-900/30';
      case 'Electricity':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'Airtime to Cash':
        return 'bg-orange-100 dark:bg-orange-900/30';
      case 'Bulk SMS':
        return 'bg-pink-100 dark:bg-pink-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getIconColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Airtime':
        return 'text-blue-700 dark:text-blue-400';
      case 'Data':
        return 'text-green-700 dark:text-green-400';
      case 'Virtual Number':
        return 'text-indigo-700 dark:text-indigo-400';
      case 'eSIM':
        return 'text-purple-700 dark:text-purple-400';
      case 'USDT':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'Cable TV':
        return 'text-purple-700 dark:text-purple-400';
      case 'Electricity':
        return 'text-yellow-700 dark:text-yellow-400';
      case 'Airtime to Cash':
        return 'text-orange-700 dark:text-orange-400';
      case 'Bulk SMS':
        return 'text-pink-700 dark:text-pink-400';
      default:
        return 'text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800">
      <div
        key={reference}
        className="md:p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-xl"
      >
        <div className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full ${getIconBg(serviceType)} flex items-center justify-center ${getIconColor(serviceType)} mr-3`}
          >
            {getIcon(serviceType)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {serviceType}
            </p>
            <p className="text-xs text-slate-500 truncate max-w-[130px] sm:max-w-[250px]">
              {remarks}
            </p>
          </div>

          <div className="text-right">
            <p
              className={`text-sm font-medium ${
                type === 'credit'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              } flex items-center justify-end`}
            >
              {type === 'credit' ? (
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
              {type === 'credit' ? '+' : '-'}₦{amount.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500">
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-2 flex justify-between items-center">
          {getStatusBadge(status)}
          <Link
            href={`/user/transactions/${id}`}
            className="text-xs text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
