import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, PhoneIcon, WifiIcon, TvIcon, ZapIcon, RefreshCcwIcon, MessageSquareIcon, ArrowRightIcon, GlobeIcon, DollarSignIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TransactionHistory } from '../components/dashboard/TransactionHistory';
import { RevenueChart } from '../components/dashboard/RevenueChart';
export const Dashboard: React.FC = () => {
  const quickActions = [{
    icon: <PhoneIcon size={24} />,
    title: 'Airtime',
    path: '/airtime',
    color: 'bg-blue-500'
  }, {
    icon: <WifiIcon size={24} />,
    title: 'Data',
    path: '/data',
    color: 'bg-green-500'
  }, {
    icon: <GlobeIcon size={24} />,
    title: 'Virtual Number',
    path: '/virtual-number',
    color: 'bg-indigo-500'
  }, {
    icon: <div size={24} />,
    title: 'eSIM',
    path: '/esim',
    color: 'bg-purple-500'
  }, {
    icon: <DollarSignIcon size={24} />,
    title: 'USDT',
    path: '/usdt',
    color: 'bg-emerald-500'
  }, {
    icon: <TvIcon size={24} />,
    title: 'Cable TV',
    path: '/cable-tv',
    color: 'bg-purple-500'
  }, {
    icon: <ZapIcon size={24} />,
    title: 'Electricity',
    path: '/electricity',
    color: 'bg-yellow-500'
  }, {
    icon: <RefreshCcwIcon size={24} />,
    title: 'Airtime to Cash',
    path: '/airtime-to-cash',
    color: 'bg-orange-500'
  }, {
    icon: <MessageSquareIcon size={24} />,
    title: 'Bulk SMS',
    path: '/bulk-sms',
    color: 'bg-pink-500'
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Welcome back, John Doe
          </p>
        </div>
        <Button>Add Funds</Button>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Balance
                </p>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mt-1">
                  ₦125,000
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400">
                <TrendingUpIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Badge variant="success" size="sm">
                +12%
              </Badge>
              <span className="text-xs text-secondary-600 dark:text-secondary-400 ml-2">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Transactions
                </p>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mt-1">
                  2,845
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <TrendingUpIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Badge variant="info" size="sm">
                +8%
              </Badge>
              <span className="text-xs text-secondary-600 dark:text-secondary-400 ml-2">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Revenue
                </p>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mt-1">
                  ₦458,623
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">
                <TrendingUpIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Badge variant="success" size="sm">
                +18%
              </Badge>
              <span className="text-xs text-secondary-600 dark:text-secondary-400 ml-2">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Expenses
                </p>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mt-1">
                  ₦123,456
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-700 dark:text-red-400">
                <TrendingDownIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Badge variant="danger" size="sm">
                +5%
              </Badge>
              <span className="text-xs text-secondary-600 dark:text-secondary-400 ml-2">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => <a key={index} href={action.path} className="flex flex-col items-center p-4 rounded-lg border border-secondary-200 dark:border-secondary-800 hover:border-primary-500 dark:hover:border-primary-600 transition-colors">
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white mb-3`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-secondary-900 dark:text-white">
                  {action.title}
                </span>
              </a>)}
          </div>
        </CardContent>
      </Card>
      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Revenue Overview</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Weekly
              </Button>
              <Button variant="outline" size="sm">
                Monthly
              </Button>
              <Button variant="primary" size="sm">
                Yearly
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm">
              View all <ArrowRightIcon size={14} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <TransactionHistory />
          </CardContent>
        </Card>
      </div>
    </div>;
};