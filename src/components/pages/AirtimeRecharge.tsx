'use client';
import React, { useState } from 'react';
import { PhoneIcon,  CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui copy/Card';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Button } from '../ui copy/Button';
import ComingSoon from '../cominSoon/ComingSoon';
export const AirtimeRecharge: React.FC = () => {
  const [step, setStep] = useState<'form' | 'confirm' | 'success' | 'error'>('form');
  const [formData, setFormData] = useState({
    network: '',
    phoneNumber: '',
    amount: '',
    paymentMethod: ''
  });
  const networks = [{
    value: '',
    label: 'Select Network'
  }, {
    value: 'mtn',
    label: 'MTN'
  }, {
    value: 'airtel',
    label: 'Airtel'
  }, {
    value: 'glo',
    label: 'Glo'
  }, {
    value: '9mobile',
    label: '9mobile'
  }];
  const paymentMethods = [{
    value: '',
    label: 'Select Payment Method'
  }, {
    value: 'wallet',
    label: 'Wallet Balance'
  }, {
    value: 'card',
    label: 'Debit/Credit Card'
  }, {
    value: 'bank',
    label: 'Bank Transfer'
  }];
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };
  const handleConfirm = () => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, randomly show success or error
      const isSuccess = Math.random() > 0.2;
      setStep(isSuccess ? 'success' : 'error');
    }, 1500);
  };
  const handleReset = () => {
    setFormData({
      network: '',
      phoneNumber: '',
      amount: '',
      paymentMethod: ''
    });
    setStep('form');
  };
  const renderForm = () => <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <ComingSoon/>
        <Select label="Network Provider" options={networks} value={formData.network} onChange={value => handleChange('network', value)} fullWidth required />
        <Input label="Phone Number" type="tel" placeholder="Enter phone number" value={formData.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} leftIcon={<PhoneIcon size={16} />} fullWidth required />
        <Input label="Amount (₦)" type="number" placeholder="Enter amount" value={formData.amount} onChange={e => handleChange('amount', e.target.value)} leftIcon={<span className="text-secondary-500">₦</span>} fullWidth required />
        <Select label="Payment Method" options={paymentMethods} value={formData.paymentMethod} onChange={value => handleChange('paymentMethod', value)} fullWidth required />
      </div>
      <div className="mt-6">
        <Button type="submit" fullWidth>
          Proceed
        </Button>
      </div>
    </form>;
  const renderConfirmation = () => <div className="space-y-4">
      <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-secondary-900 dark:text-white mb-3">
          Transaction Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Network:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              {networks.find(n => n.value === formData.network)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Phone Number:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              {formData.phoneNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Amount:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              ₦{formData.amount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Payment Method:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              {paymentMethods.find(p => p.value === formData.paymentMethod)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Fee:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              ₦0.00
            </span>
          </div>
          <div className="border-t border-secondary-200 dark:border-secondary-700 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                Total:
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                ₦{formData.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep('form')} fullWidth>
          Back
        </Button>
        <Button onClick={handleConfirm} fullWidth>
          Confirm Payment
        </Button>
      </div>
    </div>;
  const renderSuccess = () => <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
        <CheckCircleIcon size={32} />
      </div>
      <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
        Recharge Successful
      </h3>
      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-6">
        Your airtime recharge of ₦{formData.amount} to {formData.phoneNumber}{' '}
        was successful.
      </p>
      <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-secondary-900 dark:text-white mb-2">
          Transaction Details
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Transaction ID:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              TRX{Math.floor(Math.random() * 10000000)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              Date:
            </span>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleReset} fullWidth>
          New Transaction
        </Button>
        <Button onClick={() => {}} fullWidth>
          Download Receipt
        </Button>
      </div>
    </div>;
  const renderError = () => <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
        <XCircleIcon size={32} />
      </div>
      <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
        Transaction Failed
      </h3>
      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-6">
        Your airtime recharge transaction could not be completed. Please try
        again.
      </p>
      <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-secondary-900 dark:text-white mb-2">
          Error Details
        </h4>
        <p className="text-sm text-red-600 dark:text-red-400">
          Network error. Please check your connection and try again.
        </p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleReset} fullWidth>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => {}} fullWidth>
          Contact Support
        </Button>
      </div>
    </div>;
  const renderStep = () => {
    switch (step) {
      case 'form':
        return renderForm();
      case 'confirm':
        return renderConfirmation();
      case 'success':
        return renderSuccess();
      case 'error':
        return renderError();
      default:
        return renderForm();
    }
  };
  return <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
        Airtime Recharge
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Quick Recharge</CardTitle>
          <CardDescription>
            Purchase airtime for any network provider
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
          Recent Recharges
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
              {[1, 2, 3].map(item => <div key={item} className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3">
                      <PhoneIcon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary-900 dark:text-white">
                        +234 812 345 {6780 + item}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {item === 1 ? '2 hours ago' : item === 2 ? 'Yesterday' : '3 days ago'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-secondary-900 dark:text-white">
                        ₦{1000 * item},000
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Successful
                      </p>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-secondary-200 dark:border-secondary-800">
            <Button variant="ghost" size="sm">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>;
};