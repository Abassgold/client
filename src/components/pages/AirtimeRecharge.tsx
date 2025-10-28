'use client';
import React, { useState } from 'react';
import { PhoneIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Button } from '../ui copy/Button';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
import { useRouter } from 'next/navigation';
interface airtimeResponse {
  ok: boolean;
  msg?: string
}
export const AirtimeRecharge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'confirm' | 'success' | 'error'>('form');
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState({
    network: '',
    mobile_number: '',
    amount: '',
    paymentMethod: 'Wallet Balance'
  });
  const networks = [{
    value: '',
    label: 'Select Network'
  }, {
    value: '1',
    label: 'MTN'
  }, {
    value: '2',
    label: 'Glo'
  }, {
    value: '3',
    label: 'Airtel'
  }, {
    value: '4',
    label: '9mobile'
  },
 {
    value: '5',
    label: 'Smile'
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
  const handleConfirm = async() => {
    setIsLoading(true)
    try {
      const response = await axios.post<airtimeResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/airtimes/buy-airtime`,
        formData,
        {
          headers:{
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      )
      if(response.data && response.data.ok){
        console.log(response.data.ok)
      setStep('success');
      return;
      } 
      setError(response.data.msg || 'Network error')
      setStep('error');
      
    } catch(error) {
      const err = error as AxiosError
      if (err.response?.status === 401) return router.push('/login');
      setError('Airtime purchase could not be completed')
      setStep('error');
    } finally{
      setIsLoading(false)
    }
  };


  const handleReset = () => {
    setFormData({
      network: '',
      mobile_number: '',
      amount: '',
      paymentMethod: 'Wallet Balance'
    });
    setStep('form');
  };
  const renderForm = () => <form onSubmit={handleSubmit}>
    <div className="space-y-4">
      <Select label="Network Provider" options={networks} value={formData.network} onChange={value => handleChange('network', value)} fullWidth required />
      <Input label="Phone Number" type="tel" placeholder="Enter phone number" value={formData.mobile_number} onChange={e => handleChange('mobile_number', e.target.value)} leftIcon={<PhoneIcon size={16} />} fullWidth required />
      <Input label="Amount (₦)" type="number" placeholder="Enter amount" value={formData.amount} onChange={e => handleChange('amount', e.target.value)} leftIcon={<span className="text-slate-500">₦</span>} fullWidth required />
    </div>
    <div className="mt-6">
      <Button type="submit" fullWidth>
        Proceed
      </Button>
    </div>
  </form>;
  const renderConfirmation = () => <div className="space-y-4">
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
        Transaction Details
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Network:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {networks.find(n => n.value === formData.network)?.label}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Phone Number:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {formData.mobile_number}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Amount:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            ₦{formData.amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Payment Method:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            Wallet Balance
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Fee:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            ₦0.00
          </span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              Total:
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
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
        {isLoading ? 'Wait...' : 'Confirm Payment'}
      </Button>
    </div>
  </div>;
  const renderSuccess = () => <div className="text-center">
    <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
      <CheckCircleIcon size={32} />
    </div>
    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
      Recharge Successful
    </h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
      Your airtime recharge of ₦{formData.amount} to {formData.mobile_number}{' '}
      was successful.
    </p>
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
        Transaction Details
      </h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Transaction ID:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            TRX{Math.floor(Math.random() * 10000000)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Date:
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {new Date().toLocaleString()}
          </span>
        </div>
      </div>
    </div>
    <div className="flex space-x-3">
      <Button variant="outline" onClick={handleReset} fullWidth>
        New Transaction
      </Button>
      <Button onClick={() => { }} fullWidth>
        Download Receipt
      </Button>
    </div>
  </div>;
  const renderError = () => <div className="text-center">
    <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
      <XCircleIcon size={32} />
    </div>
    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
      Transaction Failed
    </h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
      Your airtime recharge transaction could not be completed. Please try
      again.
    </p>
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
        Error Details
      </h4>
      <p className="text-sm text-red-600 dark:text-red-400">
        {error}
      </p>
    </div>
    <div className="flex space-x-3">
      <Button variant="outline" onClick={handleReset} fullWidth>
        Try Again
      </Button>
      <Button variant="outline" onClick={() => { }} fullWidth>
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
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
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
  </div>;
};