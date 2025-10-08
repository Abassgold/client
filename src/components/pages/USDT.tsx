'use client';
import React, { useState } from 'react';
import { DollarSignIcon, CreditCardIcon, TrendingUpIcon, RefreshCcwIcon, AlertCircleIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon, ClipboardIcon, ShieldIcon, BarChart2Icon, BookOpenIcon, HelpCircleIcon, InfoIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Badge } from '../ui copy/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ComingSoon from '../cominSoon/ComingSoon';
export const USDT: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'history'>('buy');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('bank');
  const [amount, setAmount] = useState<string>('');
  const [calculatedAmount, setCalculatedAmount] = useState<string>('0.00');
  // Exchange rates
  const buyRate = 1650;
  const sellRate = 1600;
  // Handle amount change for buy tab
  const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    setCalculatedAmount((numValue / buyRate).toFixed(2));
  };
  // Handle USDT amount change for buy tab
  const handleBuyUsdtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCalculatedAmount(value);
    const numValue = parseFloat(value) || 0;
    setAmount((numValue * buyRate).toFixed(2));
  };
  // Handle amount change for sell tab
  const handleSellUsdtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCalculatedAmount(value);
    const numValue = parseFloat(value) || 0;
    setAmount((numValue * sellRate).toFixed(2));
  };
  // Handle NGN amount change for sell tab
  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    setCalculatedAmount((numValue / sellRate).toFixed(2));
  };
  // Mock chart data for USDT price
  const priceData = [{
    date: 'Jan',
    price: 1550
  }, {
    date: 'Feb',
    price: 1580
  }, {
    date: 'Mar',
    price: 1600
  }, {
    date: 'Apr',
    price: 1620
  }, {
    date: 'May',
    price: 1590
  }, {
    date: 'Jun',
    price: 1610
  }, {
    date: 'Jul',
    price: 1630
  }, {
    date: 'Aug',
    price: 1640
  }, {
    date: 'Sep',
    price: 1650
  }];
  // Mock transaction history
  const transactions = [{
    id: 1,
    type: 'Buy',
    amount: '500 USDT',
    value: '₦825,000',
    status: 'completed',
    date: '2 hours ago',
    txid: '0x7cd6f...3b42a'
  }, {
    id: 2,
    type: 'Sell',
    amount: '200 USDT',
    value: '₦320,000',
    status: 'completed',
    date: 'Yesterday',
    txid: '0x9ef2d...5c31b'
  }, {
    id: 3,
    type: 'Buy',
    amount: '100 USDT',
    value: '₦165,000',
    status: 'pending',
    date: '3 days ago',
    txid: '0x2ab7c...9f45d'
  }, {
    id: 4,
    type: 'Sell',
    amount: '350 USDT',
    value: '₦560,000',
    status: 'completed',
    date: '1 week ago',
    txid: '0x6de8a...2c78f'
  }, {
    id: 5,
    type: 'Buy',
    amount: '1,000 USDT',
    value: '₦1,650,000',
    status: 'completed',
    date: '2 weeks ago',
    txid: '0x3fa9b...7d24e'
  }];
  // Payment methods for buy tab
  const bankOptions = [{
    value: '',
    label: 'Select Bank'
  }, {
    value: 'gtb',
    label: 'Guaranty Trust Bank'
  }, {
    value: 'firstbank',
    label: 'First Bank'
  }, {
    value: 'zenith',
    label: 'Zenith Bank'
  }, {
    value: 'access',
    label: 'Access Bank'
  }, {
    value: 'uba',
    label: 'UBA'
  }];
  // Bank account options for sell tab
  const bankAccountOptions = [{
    value: '',
    label: 'Select Bank Account'
  }, {
    value: 'gtb',
    label: 'GTB - 0123456789'
  }, {
    value: 'firstbank',
    label: 'First Bank - 1234567890'
  }, {
    value: 'access',
    label: 'Access Bank - 2345678901'
  }];
  // Network options for USDT
  const networkOptions = [{
    value: 'trc20',
    label: 'Tron (TRC20)'
  }, {
    value: 'erc20',
    label: 'Ethereum (ERC20)'
  }, {
    value: 'bep20',
    label: 'BSC (BEP20)'
  }];
  // Custom tooltip for the price chart
  const CustomTooltip = ({
    // active,
    // payload,
    // label
  }) => {
    // if (active && payload && payload.length) {
    //   return <div className="bg-white dark:bg-[#3f4552] p-3 border border-[#d8deeb] dark:border-[#5e677b] rounded-md shadow-md">
    //       <p className="text-sm font-medium text-[#1f2229] dark:text-white">
    //         {label}
    //       </p>
    //       <p className="text-sm text-[#007569] dark:text-teal-400">
    //         ₦{payload[0].value.toLocaleString()}
    //       </p>
    //     </div>;
    // }
    return null;
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      default:
        return <Badge variant="slate">Unknown</Badge>;
    }
  };
  const renderBuyTab = () => <>
  <ComingSoon/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Buy USDT</CardTitle>
              <CardDescription>
                Purchase USDT with Nigerian Naira (NGN)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1f2229] dark:text-white">
                    Current Buy Rate:
                  </span>
                  <span className="text-base font-bold text-[#007569] dark:text-teal-400">
                    1 USDT = ₦{buyRate.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-[#ebeef5] dark:bg-[#3f4552] rounded-full">
                  <div className="h-2 bg-teal-600 rounded-full w-3/4"></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#9daccd]">
                    Daily Limit: ₦10,000,000
                  </span>
                  <span className="text-xs text-[#9daccd]">
                    Available: ₦7,500,000
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#1f2229] dark:text-white mb-1 block">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className={`flex items-center justify-center p-3 rounded-lg border ${paymentMethod === 'bank' ? 'border-[#00c3af] bg-[#e6f9f7] dark:bg-teal-900/20' : 'border-[#d8deeb] dark:border-[#3f4552]'}`} onClick={() => setPaymentMethod('bank')}>
                      <CreditCardIcon size={20} className={`mr-2 ${paymentMethod === 'bank' ? 'text-[#007569] dark:text-teal-400' : 'text-[#9daccd]'}`} />
                      <span className={`text-sm font-medium ${paymentMethod === 'bank' ? 'text-[#007569] dark:text-teal-400' : 'text-[#5e677b] dark:text-[#c4cde1]'}`}>
                        Bank Transfer
                      </span>
                    </button>
                    <button className={`flex items-center justify-center p-3 rounded-lg border ${paymentMethod === 'card' ? 'border-[#00c3af] bg-[#e6f9f7] dark:bg-teal-900/20' : 'border-[#d8deeb] dark:border-[#3f4552]'}`} onClick={() => setPaymentMethod('card')}>
                      <CreditCardIcon size={20} className={`mr-2 ${paymentMethod === 'card' ? 'text-[#007569] dark:text-teal-400' : 'text-[#9daccd]'}`} />
                      <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-[#007569] dark:text-teal-400' : 'text-[#5e677b] dark:text-[#c4cde1]'}`}>
                        Debit Card
                      </span>
                    </button>
                  </div>
                </div>
                {paymentMethod === 'bank' && <Select label="Select Bank" options={bankOptions} fullWidth required />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input label="Amount (NGN)" type="number" placeholder="Enter amount in Naira" value={amount} onChange={handleBuyAmountChange} fullWidth required leftAddon="₦" />
                  </div>
                  <div>
                    <Input label="You will receive (USDT)" type="number" placeholder="0.00" value={calculatedAmount} onChange={handleBuyUsdtChange} fullWidth required rightAddon="USDT" />
                  </div>
                </div>
                <Select label="Select Network" options={networkOptions} fullWidth required />
                <Input label="USDT Wallet Address" type="text" placeholder="Enter your USDT wallet address" fullWidth required />
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-start">
                    <InfoIcon size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Please ensure you enter the correct wallet address.
                      Transactions sent to incorrect addresses cannot be
                      reversed. Only send to TRC20 network addresses to avoid
                      loss of funds.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 border-t border-[#d8deeb] dark:border-[#3f4552]">
              <Button variant="outline">Cancel</Button>
              <Button>Buy USDT Now</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>USDT Price Chart</CardTitle>
              <CardDescription>Last 9 months trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{
                    fontSize: 12,
                    fill: '#64748b'
                  }} tickLine={{
                    stroke: '#e2e8f0'
                  }} axisLine={{
                    stroke: '#e2e8f0'
                  }} />
                    <YAxis tick={{
                    fontSize: 12,
                    fill: '#64748b'
                  }} tickLine={{
                    stroke: '#e2e8f0'
                  }} axisLine={{
                    stroke: '#e2e8f0'
                  }} tickFormatter={value => `₦${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="price" stroke="#007569" strokeWidth={2} dot={{
                    r: 4,
                    fill: '#007569'
                  }} activeDot={{
                    r: 6,
                    fill: '#007569'
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                    <ShieldIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      Verify Addresses
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      Always double-check wallet addresses before confirming
                      transactions
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                    <AlertCircleIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      Network Compatibility
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      Ensure your wallet supports the selected network (TRC20,
                      ERC20, BEP20)
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                    <HelpCircleIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      Need Help?
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      Contact our support team for assistance with your
                      transactions
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Learn More About USDT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mx-auto mb-3">
                <CreditCardIcon size={24} />
              </div>
              <h3 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                1. Select Payment Method
              </h3>
              <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                Choose between bank transfer or debit card payment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mx-auto mb-3">
                <DollarSignIcon size={24} />
              </div>
              <h3 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                2. Enter Amount
              </h3>
              <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                Specify how much USDT you want to purchase
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mx-auto mb-3">
                <ClipboardIcon size={24} />
              </div>
              <h3 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                3. Provide Wallet Address
              </h3>
              <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                Enter your USDT wallet address for the transfer
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mx-auto mb-3">
                <CheckCircleIcon size={24} />
              </div>
              <h3 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                4. Receive USDT
              </h3>
              <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                Get your USDT delivered to your wallet quickly
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>;
  const renderSellTab = () => <>
  <ComingSoon/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sell USDT</CardTitle>
              <CardDescription>
                Convert your USDT to Nigerian Naira (NGN)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1f2229] dark:text-white">
                    Current Sell Rate:
                  </span>
                  <span className="text-base font-bold text-[#007569] dark:text-teal-400">
                    1 USDT = ₦{sellRate.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-[#ebeef5] dark:bg-[#3f4552] rounded-full">
                  <div className="h-2 bg-teal-600 rounded-full w-2/3"></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#9daccd]">
                    Daily Limit: 5,000 USDT
                  </span>
                  <span className="text-xs text-[#9daccd]">
                    Available: 3,300 USDT
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input label="Amount (USDT)" type="number" placeholder="Enter amount in USDT" value={calculatedAmount} onChange={handleSellUsdtChange} fullWidth required rightAddon="USDT" />
                  </div>
                  <div>
                    <Input label="You will receive (NGN)" type="number" placeholder="0.00" value={amount} onChange={handleSellAmountChange} fullWidth required leftAddon="₦" />
                  </div>
                </div>
                <Select label="Select Network" options={networkOptions} fullWidth required />
                <Select label="Receive Payment To" options={bankAccountOptions} fullWidth required />
                <div className="bg-[#f5f7fa] dark:bg-[#3f4552]/50 rounded-lg p-4 border border-[#d8deeb] dark:border-[#5e677b]">
                  <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-3">
                    Deposit USDT to this address:
                  </h4>
                  <div className="flex items-center justify-between bg-white dark:bg-[#1f2229] p-3 rounded-md border border-[#d8deeb] dark:border-[#5e677b]">
                    <code className="text-xs sm:text-sm text-[#3f4552] dark:text-[#d8deeb] break-all">
                      TWd89UxfPmuNmCpiVeQrPKqfzqULxfgbYH
                    </code>
                    <button className="ml-2 p-1.5 rounded-md hover:bg-[#ebeef5] dark:hover:bg-[#3f4552]">
                      <ClipboardIcon size={16} className="text-[#9daccd]" />
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    <div className="flex items-start">
                      <AlertCircleIcon size={14} className="text-amber-600 dark:text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
                      <span>
                        Only send USDT via the TRC20 network to this address.
                        Other networks will result in loss of funds.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-start">
                    <InfoIcon size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      After sending USDT to the address above, your transaction
                      will be processed automatically. Please allow up to 30
                      minutes for network confirmations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 border-t border-[#d8deeb] dark:border-[#3f4552]">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm Sale</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b border-[#d8deeb] dark:border-[#3f4552]">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500 mr-3">
                    <RefreshCcwIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white">
                      Waiting for Deposit
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      Send USDT to the provided address
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#9daccd]">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                        Waiting
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#ebeef5] dark:bg-[#3f4552] rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-3">
                  Recent Transactions
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500 mr-2">
                        <ArrowLeftIcon size={12} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#1f2229] dark:text-white">
                          Sold 200 USDT
                        </p>
                        <p className="text-xs text-[#9daccd]">Yesterday</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-green-600 dark:text-green-500">
                      +₦320,000
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500 mr-2">
                        <ArrowRightIcon size={12} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#1f2229] dark:text-white">
                          Bought 500 USDT
                        </p>
                        <p className="text-xs text-[#9daccd]">2 days ago</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-500">
                      -₦825,000
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500 mr-2">
                        <ArrowLeftIcon size={12} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#1f2229] dark:text-white">
                          Sold 350 USDT
                        </p>
                        <p className="text-xs text-[#9daccd]">1 week ago</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-green-600 dark:text-green-500">
                      +₦560,000
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Learn About USDT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                    <BookOpenIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      What is USDT?
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      USDT (Tether) is a stablecoin pegged to the US Dollar
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                    <BarChart2Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      Price Stability
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      USDT maintains a value equal to 1 US Dollar
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                    <TrendingUpIcon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                      Global Usage
                    </h4>
                    <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                      Used worldwide for trading, remittance, and savings
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
  const renderHistoryTab = () => <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your USDT transactions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f7fa] dark:bg-[#3f4552]/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#9daccd] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8deeb] dark:divide-[#3f4552]">
                {transactions.map(tx => <tr key={tx.id} className="hover:bg-[#f5f7fa] dark:hover:bg-[#3f4552]/50 transition-colors">
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex items-center ${tx.type === 'Buy' ? 'text-blue-700 dark:text-blue-400' : 'text-green-700 dark:text-green-400'}`}>
                        {tx.type === 'Buy' ? <ArrowRightIcon size={14} className="mr-1" /> : <ArrowLeftIcon size={14} className="mr-1" />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#1f2229] dark:text-white">
                      {tx.amount}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#1f2229] dark:text-white">
                      {tx.value}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#7e8aa4] dark:text-[#b1bdd7]">
                      {tx.date}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#7e8aa4] dark:text-[#b1bdd7] font-mono">
                      {tx.txid}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-[#d8deeb] dark:border-[#3f4552]">
          <div className="text-sm text-[#7e8aa4] dark:text-[#b1bdd7]">
            Showing 5 of 24 transactions
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Buy Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mx-auto mb-3">
                <ArrowRightIcon size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#1f2229] dark:text-white mb-1">
                1,600 USDT
              </h3>
              <p className="text-sm text-[#7e8aa4] dark:text-[#b1bdd7] mb-4">
                Total Purchased
              </p>
              <div className="bg-[#ebeef5] dark:bg-[#3f4552] rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Total Value
                  </span>
                  <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                    ₦2,640,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Avg. Rate
                  </span>
                  <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                    ₦1,650
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sell Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 mx-auto mb-3">
                <ArrowLeftIcon size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#1f2229] dark:text-white mb-1">
                550 USDT
              </h3>
              <p className="text-sm text-[#7e8aa4] dark:text-[#b1bdd7] mb-4">
                Total Sold
              </p>
              <div className="bg-[#ebeef5] dark:bg-[#3f4552] rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Total Value
                  </span>
                  <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                    ₦880,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Avg. Rate
                  </span>
                  <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                    ₦1,600
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mx-auto mb-3">
                <DollarSignIcon size={20} />
              </div>
              <h3 className="text-2xl font-bold text-[#1f2229] dark:text-white mb-1">
                1,050 USDT
              </h3>
              <p className="text-sm text-[#7e8aa4] dark:text-[#b1bdd7] mb-4">
                Current Holdings
              </p>
              <div className="bg-[#ebeef5] dark:bg-[#3f4552] rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Estimated Value
                  </span>
                  <span className="text-xs font-medium text-[#1f2229] dark:text-white">
                    ₦1,732,500
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Profit/Loss
                  </span>
                  <span className="text-xs font-medium text-green-600 dark:text-green-500">
                    +₦27,500
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>;
  return <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2229] dark:text-white">
            USDT Exchange
          </h1>
          <p className="text-[#7e8aa4] dark:text-[#b1bdd7]">
            Buy and sell USDT at competitive rates
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant={activeTab === 'buy' ? 'teal' : 'outline'} onClick={() => setActiveTab('buy')}>
            Buy USDT
          </Button>
          <Button variant={activeTab === 'sell' ? 'teal' : 'outline'} onClick={() => setActiveTab('sell')}>
            Sell USDT
          </Button>
          <Button variant={activeTab === 'history' ? 'teal' : 'outline'} onClick={() => setActiveTab('history')}>
            History
          </Button>
        </div>
      </div>
      {activeTab === 'buy' && renderBuyTab()}
      {activeTab === 'sell' && renderSellTab()}
      {activeTab === 'history' && renderHistoryTab()}
    </div>;
};