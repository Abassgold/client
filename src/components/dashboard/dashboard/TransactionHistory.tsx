import React from 'react';
import { PhoneIcon, WifiIcon, TvIcon, ZapIcon, RefreshCcwIcon, MessageSquareIcon, ArrowDownLeftIcon, ArrowUpRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui copy/Badge';
type transactionType = {
  reference: string;
  serviceType: string;
  amount: number;
  type: "credit" | "debit";
  status: string;
}
export const TransactionHistory: React.FC<transactionType> = ({ reference, serviceType,  amount, type, status}:transactionType) => {
  // const transactions = [{
  //   id: 1,
  //   type: 'Airtime',
  //   recipient: '+234 812 345 6789',
  //   amount: '₦2,000',
  //   status: 'successful',
  //   date: '2 mins ago',
  //   icon: <PhoneIcon size={16} />,
  //   iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  //   iconColor: 'text-blue-700 dark:text-blue-400'
  // }, {
  //   id: 2,
  //   type: 'Data Bundle',
  //   recipient: '+234 812 345 6789',
  //   amount: '₦5,000',
  //   status: 'successful',
  //   date: '1 hour ago',
  //   icon: <WifiIcon size={16} />,
  //   iconBg: 'bg-green-100 dark:bg-green-900/30',
  //   iconColor: 'text-green-700 dark:text-green-400'
  // }, {
  //   id: 3,
  //   type: 'Cable TV',
  //   recipient: 'DSTV - Premium',
  //   amount: '₦24,500',
  //   status: 'pending',
  //   date: '3 hours ago',
  //   icon: <TvIcon size={16} />,
  //   iconBg: 'bg-purple-100 dark:bg-purple-900/30',
  //   iconColor: 'text-purple-700 dark:text-purple-400'
  // }, {
  //   id: 4,
  //   type: 'Electricity',
  //   recipient: 'Ikeja Electric - 0123456789',
  //   amount: '₦10,000',
  //   status: 'successful',
  //   date: 'Yesterday',
  //   icon: <ZapIcon size={16} />,
  //   iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
  //   iconColor: 'text-yellow-700 dark:text-yellow-400'
  // }, {
  //   id: 5,
  //   type: 'Airtime to Cash',
  //   recipient: 'Bank Transfer',
  //   amount: '₦8,500',
  //   status: 'failed',
  //   date: 'Yesterday',
  //   icon: <RefreshCcwIcon size={16} />,
  //   iconBg: 'bg-orange-100 dark:bg-orange-900/30',
  //   iconColor: 'text-orange-700 dark:text-orange-400'
  // }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'successful':
        return <Badge variant="success">Successful</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="slate">Unknown</Badge>;
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
  return <div className="divide-y divide-slate-200 dark:divide-slate-800">
        <div
          key={reference}
          className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${getIconBg(type)} flex items-center justify-center ${getIconColor(type)} mr-3`}
            >
              {getIcon(serviceType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {serviceType}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {type}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-medium ${type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'} flex items-center justify-end`}
              >
                {type === 'credit' ? (
                  <ArrowDownLeftIcon
                    size={14}
                    className="mr-1 text-green-600 dark:text-green-400"
                  />
                ) : (
                  <ArrowUpRightIcon
                    size={14}
                    className="mr-1 text-slate-600 dark:text-slate-400"
                  />
                )}
                {type === 'credit' ? '+' : '-'}
                ₦{amount}
              </p>
              <p className="text-xs text-slate-500">date</p>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs">{getStatusBadge(status)}</div>
            <button className="text-xs text-teal-700 hover:text-teal-800 dark:text-teal-500 dark:hover:text-teal-400 font-medium">
              View Details
            </button>
          </div>
        </div>
    </div>
};