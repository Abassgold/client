'use client';
import React, { useState } from 'react';
import { PhoneIcon, CheckCircleIcon, XCircleIcon, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Button } from '../ui copy/Button';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
import { useRouter } from 'next/navigation';
import { getNetworkByRegex } from '../verifyNetwork/verifyNextwork';
import Link from 'next/link';
interface RefObject {
  msg: string;
  ref: string;
}

interface AirtimeResponse {
  ok: boolean;
  msg?: string;
  result?: RefObject;
}

export const AirtimeRecharge: React.FC = () => {
  const [ref, setRef] = useState<RefObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'confirm' | 'success' | 'error' | 'password'>('form');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    network: '',
    mobile_number: '',
    amount: '',
    pin: '',
    paymentMethod: 'Wallet Balance'
  });

  const networks = [
    { value: '', label: 'Select Network' },
    { value: 'MTN', label: 'MTN' },
    { value: 'GLO', label: 'GLO' },
    { value: 'AIRTEL', label: 'AIRTEL' },
    { value: '9MOBILE', label: '9MOBILE' },
    { value: 'SMILE', label: 'SMILE' }
  ];

  const handleChange = (field: string, value: string) => {
    const updatedFormData = { ...formData, [field]: value };

    if (field === 'mobile_number') {
      const detectedNetwork = getNetworkByRegex(value);
      if (detectedNetwork !== 'UNKNOWN') {
        updatedFormData.network = detectedNetwork;
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const detectedNetwork = getNetworkByRegex(formData.mobile_number);

    if (detectedNetwork === 'UNKNOWN') {
      setError('Invalid number or network selection');
      setStep('error');
      setIsLoading(false);
      return;
    }
    if (parseFloat(formData.amount) < 50) {
      setError('Minimum amount is  ₦50')
      setStep('error');
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post<AirtimeResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/airtimes/buy-airtime`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.ok) {
        setStep('success');
        setRef(response.data.result ?? null)
        return;
      }

      setError(response.data.msg || 'Network error');
      setStep('error');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) return router.push('/login');

      setError('Airtime purchase could not be completed');
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ network: '', mobile_number: '', amount: '', pin: '', paymentMethod: 'Wallet Balance' });
    setStep('form');
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Select
          label="Network Provider"
          options={networks}
          value={formData.network}
          onChange={(value) => handleChange('network', value)}
          fullWidth
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          value={formData.mobile_number}
          onChange={(e) => handleChange('mobile_number', e.target.value)}
          leftIcon={<PhoneIcon size={16} />}
          fullWidth
          required
        />

        <div className="dark:text-slate-100 text-slate-800 text-sm italic">
          Identified Network: {getNetworkByRegex(formData.mobile_number)}
        </div>

        <Input
          label="Amount (₦)"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          leftIcon={<span className="text-slate-500">₦</span>}
          fullWidth
          required
        />
      </div>

      <div className="mt-6">
        <Button type="submit" fullWidth>
          Proceed
        </Button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
          Transaction Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Network:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">{formData.network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Phone Number:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">{formData.mobile_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Amount:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">₦{formData.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Payment Method:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">Wallet Balance</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep('form')} fullWidth>
          Back
        </Button>
        <Button onClick={() => setStep('password')} fullWidth>
          {isLoading ? 'Wait...' : 'Confirm Payment'}
        </Button>
      </div>
    </div>
  );

  const renderPassword = () => <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
    <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
      <div className="space-y-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
          <form onSubmit={handleConfirm}>
            <div className="space-y-4">
              <Input
                label="Transaction PIN"
                type="tel"
                placeholder="Enter your PIN"
                value={formData.pin}
                onChange={(e) => handleChange('pin', e.target.value)}
                leftIcon={<Lock size={16} />}
                fullWidth
                required
                minLength={4}
                maxLength={4}
              />
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep('form')} fullWidth>
                  Cancel
                </Button>
                <Button type='submit' fullWidth>
                  {isLoading ? 'Wait...' : 'Submit'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  const renderSuccess = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
        <CheckCircleIcon size={32} />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Recharge Successful</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        {ref?.msg}
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
              {ref?.ref}
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
        <Button fullWidth>Download Receipt</Button>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
        <XCircleIcon size={32} />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Transaction Failed</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Your airtime recharge transaction could not be completed. Please try again.
      </p>
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      <div className="flex space-x-3 mt-4">
        <Button variant="outline" onClick={handleReset} fullWidth>
          Try Again
        </Button>
        <Button variant="teal" fullWidth>
          <Link
            className="w-full h-full"
            target="_blank"
            href="https://wa.me/qr/BHKITMXTHP2PE1"
          >
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );

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
      case 'password':
        return renderPassword();
      default:
        return renderForm();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Airtime Recharge</CardTitle>
          <CardDescription>Buy airtime instantly using your wallet balance.</CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
};
