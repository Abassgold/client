'use client';
import React, { useState } from 'react';
import {CreditCardIcon, DownloadIcon, AlertCircleIcon, ArrowRightIcon, ArrowLeftIcon, ClipboardIcon, ShieldIcon, HelpCircleIcon, InfoIcon, WalletIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Badge } from '../ui copy/Badge';
export const USDT: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'buy' | 'sell' | 'withdraw' | 'history'
  >('buy')
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('bank')
  const [amount, setAmount] = useState<string>('')
  const [calculatedAmount, setCalculatedAmount] = useState<string>('0.00')
  // Withdrawal state
  const [withdrawAmount, setWithdrawAmount] = useState<string>('')
  const [withdrawNgnAmount, setWithdrawNgnAmount] = useState<string>('0.00')
  // Mock user data
  const userBalance = 1050.0
  // Exchange rates
  const buyRate = 1650
  const sellRate = 1600
  // Handle amount change for buy tab
  const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    const numValue = parseFloat(value) || 0
    setCalculatedAmount((numValue / buyRate).toFixed(2))
  }
  // Handle USDT amount change for buy tab
  const handleBuyUsdtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCalculatedAmount(value)
    const numValue = parseFloat(value) || 0
    setAmount((numValue * buyRate).toFixed(2))
  }
  
  // Handle withdrawal amount change
  const handleWithdrawAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    setWithdrawAmount(value)
    const numValue = parseFloat(value) || 0
    setWithdrawNgnAmount((numValue * sellRate).toFixed(2))
  }
  
  // Mock transaction history
  const transactions = [
    {
      id: 1,
      type: 'Buy',
      amount: '500 USDT',
      value: '₦825,000',
      status: 'completed',
      date: '2 hours ago',
      txid: '0x7cd6f...3b42a',
    },
    {
      id: 2,
      type: 'Sell',
      amount: '200 USDT',
      value: '₦320,000',
      status: 'completed',
      date: 'Yesterday',
      txid: '0x9ef2d...5c31b',
    },
    {
      id: 3,
      type: 'Buy',
      amount: '100 USDT',
      value: '₦165,000',
      status: 'pending',
      date: '3 days ago',
      txid: '0x2ab7c...9f45d',
    },
    {
      id: 4,
      type: 'Sell',
      amount: '350 USDT',
      value: '₦560,000',
      status: 'completed',
      date: '1 week ago',
      txid: '0x6de8a...2c78f',
    },
    {
      id: 5,
      type: 'Buy',
      amount: '1,000 USDT',
      value: '₦1,650,000',
      status: 'completed',
      date: '2 weeks ago',
      txid: '0x3fa9b...7d24e',
    },
  ]
  // Payment methods for buy tab
  const bankOptions = [
    {
      value: '',
      label: 'Select Bank',
    },
    {
      value: 'gtb',
      label: 'Guaranty Trust Bank',
    },
    {
      value: 'firstbank',
      label: 'First Bank',
    },
    {
      value: 'zenith',
      label: 'Zenith Bank',
    },
    {
      value: 'access',
      label: 'Access Bank',
    },
    {
      value: 'uba',
      label: 'UBA',
    },
  ]
  // Bank account options for sell/withdraw tab
 
  // Network options for USDT
  const networkOptions = [
    {
      value: 'trc20',
      label: 'Tron (TRC20)',
    },
    {
      value: 'erc20',
      label: 'Ethereum (ERC20)',
    },
    {
      value: 'bep20',
      label: 'BSC (BEP20)',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'failed':
        return <Badge variant="danger">Failed</Badge>
      default:
        return <Badge variant="slate">Unknown</Badge>
    }
  }
  const renderBuyTab = () => (
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
                  <button
                    className={`flex items-center justify-center p-3 rounded-lg border ${paymentMethod === 'bank' ? 'border-[#00c3af] bg-[#e6f9f7] dark:bg-teal-900/20' : 'border-[#d8deeb] dark:border-[#3f4552]'}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <CreditCardIcon
                      size={20}
                      className={`mr-2 ${paymentMethod === 'bank' ? 'text-[#007569] dark:text-teal-400' : 'text-[#9daccd]'}`}
                    />
                    <span
                      className={`text-sm font-medium ${paymentMethod === 'bank' ? 'text-[#007569] dark:text-teal-400' : 'text-[#5e677b] dark:text-[#c4cde1]'}`}
                    >
                      Bank Transfer
                    </span>
                  </button>
                  <button
                    className={`flex items-center justify-center p-3 rounded-lg border ${paymentMethod === 'card' ? 'border-[#00c3af] bg-[#e6f9f7] dark:bg-teal-900/20' : 'border-[#d8deeb] dark:border-[#3f4552]'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCardIcon
                      size={20}
                      className={`mr-2 ${paymentMethod === 'card' ? 'text-[#007569] dark:text-teal-400' : 'text-[#9daccd]'}`}
                    />
                    <span
                      className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-[#007569] dark:text-teal-400' : 'text-[#5e677b] dark:text-[#c4cde1]'}`}
                    >
                      Debit Card
                    </span>
                  </button>
                </div>
              </div>
              {paymentMethod === 'bank' && (
                <Select
                  label="Select Bank"
                  options={bankOptions}
                  fullWidth
                  required
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Amount (NGN)"
                    type="number"
                    placeholder="Enter amount in Naira"
                    value={amount}
                    onChange={handleBuyAmountChange}
                    fullWidth
                    required
                    leftAddon="₦"
                  />
                </div>
                <div>
                  <Input
                    label="You will receive (USDT)"
                    type="number"
                    placeholder="0.00"
                    value={calculatedAmount}
                    onChange={handleBuyUsdtChange}
                    fullWidth
                    required
                    rightAddon="USDT"
                  />
                </div>
              </div>
              <Select
                label="Select Network"
                options={networkOptions}
                fullWidth
                required
              />
              <Input
                label="USDT Wallet Address"
                type="text"
                placeholder="Enter your USDT wallet address"
                fullWidth
                required
              />
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-start">
                  <InfoIcon
                    size={16}
                    className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                  />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Please ensure you enter the correct wallet address.
                    Transactions sent to incorrect addresses cannot be reversed.
                    Only send to TRC20 network addresses to avoid loss of funds.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3 border-t border-[#d8deeb] dark:border-[#3f4552]">
            <Button variant="outline">Cancel</Button>
            <Button variant="teal">Buy USDT Now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
  const renderSellTab = () => (
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

            <div className="flex flex-col items-center py-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 mb-6">
              <div className="bg-white p-2 rounded-lg mb-4 shadow-sm">
                <div className="w-40 h-40 bg-slate-200 flex items-center justify-center">
                  <span className="text-xs text-slate-500">
                    QR Code Placeholder
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Scan this QR code with your wallet app
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  USDT Wallet Address TRC20
                </label>
                <div className="flex">
                  <div className="flex-grow bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-md p-3">
                    <p className="text-sm text-slate-900 dark:text-white font-mono break-all">
                      T9yD14Nj9j7xAB4dbGeiX9h8zzDXL5Dk5
                    </p>
                  </div>
                  <button className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-4 rounded-r-md border border-l-0 border-slate-200 dark:border-slate-700 transition-colors">
                    <ClipboardIcon
                      size={18}
                      className="text-slate-700 dark:text-slate-300"
                    />
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex">
                  <AlertCircleIcon
                    size={20}
                    className="text-amber-600 dark:text-amber-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-500 mb-1">
                      Important Information
                    </h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc pl-4">
                      <li>
                        Only send USDT via the TRC20 network to this address
                      </li>
                      <li>
                        Sending any other token may result in permanent loss of
                        funds
                      </li>
                      <li>Minimum deposit: 10 USDT</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <InfoIcon
                    size={20}
                    className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">
                      Processing Time
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your deposit will be credited automatically after 1-5
                      confirmations. This typically takes 1-5 minutes depending
                      on network congestion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                Need Help?
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                If you need assistance with your deposit, please contact our
                support team.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>How to Deposit USDT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  title: 'Select the Network',
                  desc: 'Choose the network you want to use for the transfer. We recommend TRC20 for lower fees.',
                },
                {
                  title: 'Copy Address or Scan',
                  desc: 'Use the copy button to copy the wallet address or scan the QR code with your wallet app.',
                },
                {
                  title: 'Send USDT',
                  desc: "Go to your wallet app and send USDT to the copied address. Make sure you're sending on the correct network.",
                },
                {
                  title: 'Wait for Confirmation',
                  desc: 'Once the transaction is confirmed on the blockchain, your wallet will be credited automatically.',
                },
              ].map((step, idx) => (
                <div key={idx} className="flex">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
  const renderWithdrawTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        {/* Balance Card */}
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-teal-600 to-teal-800 border-none text-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">
                    Available Balance
                  </p>
                  <h2 className="text-3xl font-bold">
                    {userBalance.toLocaleString()} USDT
                  </h2>
                  <p className="text-teal-100 text-xs mt-1">
                    ≈ ₦{(userBalance * sellRate).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <WalletIcon className="text-white h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw USDT</CardTitle>
            <CardDescription>
              Withdraw your USDT balance to your Nigerian Bank Account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#1f2229] dark:text-white">
                  Current Withdrawal Rate:
                </span>
                <span className="text-base font-bold text-[#007569] dark:text-teal-400">
                  1 USDT = ₦{sellRate.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Amount to Withdraw (USDT)"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={handleWithdrawAmountChange}
                    fullWidth
                    required
                    rightAddon="USDT"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-[#7e8aa4]">Min: 10 USDT</span>
                    <button
                      className="text-xs text-[#007569] font-medium hover:underline"
                      onClick={() => {
                        setWithdrawAmount(userBalance.toString())
                        setWithdrawNgnAmount(
                          (userBalance * sellRate).toFixed(2),
                        )
                      }}
                    >
                      Max: {userBalance} USDT
                    </button>
                  </div>
                </div>
                <div>
                  <Input
                    label="You will receive (NGN)"
                    type="number"
                    placeholder="0.00"
                    value={withdrawNgnAmount}
                    readOnly
                    fullWidth
                    leftAddon="₦"
                    className="bg-gray-50 dark:bg-slate-800"
                  />
                </div>
              </div>


              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <InfoIcon
                    size={20}
                    className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">
                      Processing Time
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Withdrawals are processed within 1-24 hours. Please ensure
                      your bank details are correct to avoid delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3 border-t border-[#d8deeb] dark:border-[#3f4552]">
            <Button variant="outline">Cancel</Button>
            <Button
              variant="teal"
              disabled={
                !withdrawAmount ||
                parseFloat(withdrawAmount) <= 0 ||
                parseFloat(withdrawAmount) > userBalance
              }
            >
              Withdraw Funds
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                  <DownloadIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                    Daily Limit
                  </h4>
                  <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    You can withdraw up to 5,000 USDT per day.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                  <ShieldIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                    Secure Transfer
                  </h4>
                  <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Funds are sent directly to your verified bank account.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#007569] dark:text-teal-400 mr-3 flex-shrink-0">
                  <HelpCircleIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#1f2229] dark:text-white mb-1">
                    Support
                  </h4>
                  <p className="text-xs text-[#7e8aa4] dark:text-[#b1bdd7]">
                    Issues with withdrawal? Contact our 24/7 support.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
  const renderHistoryTab = () => (
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
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-[#f5f7fa] dark:hover:bg-[#3f4552]/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center ${tx.type === 'Buy' ? 'text-blue-700 dark:text-blue-400' : 'text-green-700 dark:text-green-400'}`}
                    >
                      {tx.type === 'Buy' ? (
                        <ArrowRightIcon size={14} className="mr-1" />
                      ) : (
                        <ArrowLeftIcon size={14} className="mr-1" />
                      )}
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
                </tr>
              ))}
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
  )
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2229] dark:text-white">
            USDT Exchange
          </h1>
          <p className="text-[#7e8aa4] dark:text-[#b1bdd7]">
            Buy, sell, and withdraw USDT at competitive rates
          </p>
        </div>
        <div className="flex flex-wrap gap-2 bg-white dark:bg-[#1f2229] p-1 rounded-lg border border-[#d8deeb] dark:border-[#3f4552]">
          <Button
            variant={activeTab === 'buy' ? 'teal' : 'ghost'}
            onClick={() => setActiveTab('buy')}
            size="sm"
          >
            Buy USDT
          </Button>
          <Button
            variant={activeTab === 'sell' ? 'teal' : 'ghost'}
            onClick={() => setActiveTab('sell')}
            size="sm"
          >
            Sell USDT
          </Button>
          <Button
            variant={activeTab === 'withdraw' ? 'teal' : 'ghost'}
            onClick={() => setActiveTab('withdraw')}
            size="sm"
          >
            Withdraw
          </Button>
          <Button
            variant={activeTab === 'history' ? 'teal' : 'ghost'}
            onClick={() => setActiveTab('history')}
            size="sm"
          >
            History
          </Button>
        </div>
      </div>

      {activeTab === 'buy' && renderBuyTab()}
      {activeTab === 'sell' && renderSellTab()}
      {activeTab === 'withdraw' && renderWithdrawTab()}
      {activeTab === 'history' && renderHistoryTab()}
    </div>
  )
}