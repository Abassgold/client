'use client';
import React, { useState } from 'react';
import { TvIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { Lock, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';


import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui copy/Card';
import { Input } from '../ui copy/Input';
import { Button } from '../ui copy/Button';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';

import { CableType, tvPlans } from '../tv/tvplans';

type ProviderType = "GOTV" | "DSTV" | "STARTIMES" | "";
type Verify = {
  ok: boolean;
  invalid: boolean;
  msg: string;
};

export const CableTV: React.FC = () => {
  const [step, setStep] = useState('form')
  const [isLoading, setIsLoading] = useState(false);

  const [provider, setProvider] = useState<ProviderType>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const [cable, setCable] = useState<CableType | null>(null);
  const [pin, setPin] = useState('');

  const [IUC, setIUC] = useState('');
  const [verify, setVerify] = useState<Verify>({
    ok: false,
    invalid: true,
    msg: ''
  });

  const providers = [
    { value: '', label: 'Select Provider' },
    { value: 'DSTV', label: 'DSTV' },
    { value: 'GOTV', label: 'GOTV' },
    { value: 'STARTIMES', label: 'StarTimes' }
  ];
const handleSteps = (input: string) =>{
setStep(input)
}
  const verifyIUC = async (input: string) => {
    if (!input || !provider) return;
    setIsLoading(true);

    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cable/validate`,
        { IUC: input, provider },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      );

      setVerify({
        ok: response.data.ok,
        invalid: response.data.invalid,
        msg: response.data.msg
      });

    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify;

      setVerify({
        ok: errorResponse.ok,
        invalid: errorResponse.invalid,
        msg: errorResponse.msg
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cable/subscribe`,
        {
          pin,
          provider,
          IUC,
          ...cable
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      );
console.log(response)
    } catch (error) {
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify;
      alert(errorResponse ?? 'Something went wrong');

    } finally {
      setIsLoading(false);
    }
  };

  const chosePlan = (planId: string) => {
    setSelectedPlan(planId);
    const selected = tvPlans[provider]?.find(item => item.id === planId);
    setCable(selected ?? null);
  };
const renderPassword = () => <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
    <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
      <div className="space-y-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Transaction PIN"
                type="tel"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin( e.target.value)}
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
  const renderForm =()=>{
  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Cable TV Subscription
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Renew Subscription</CardTitle>
          <CardDescription>Enter your decoder details</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={()=>handleSteps('password')}>

            {/* TV Provider */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                TV Provider
              </label>

              <select
                value={provider}
                onChange={(e) => {
                  setProvider(e.target.value as ProviderType);
                  setSelectedPlan("");
                  setCable(null);
                }}
                className="block sm:text-sm w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
              >
                {providers.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* IUC Input */}
            <Input
              disabled={!provider}
              label="Smart Card / IUC Number"
              type="text"
              placeholder="Enter decoder number"
              leftIcon={<TvIcon size={16} />}
              fullWidth
              onChange={e => setIUC(e.target.value)}
              required
            />

            {/* Plan List */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                Plan
              </label>

              <select
                value={selectedPlan}
                onChange={(e) => chosePlan(e.target.value)}
                disabled={!provider}
                className="block sm:text-sm w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
              >
                <option value="">Select Plan</option>

                {provider &&
                  tvPlans[provider]?.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.package_name}, ₦{item.price}
                    </option>
                  ))}
              </select>
            </div>

            {/* Customer Name */}
            {verify.ok && (
              <Input
                className={`${verify.invalid && 'bg-red-200 text-red-600'}`}
                label='Customer Name'
                type="tel"
                placeholder={verify.msg}
                fullWidth
                disabled
              />
            )}

            {/* Verify / Continue Button */}
            {!verify.ok || verify.invalid ? (
              <Button
                disabled={isLoading || !IUC || !provider}
                fullWidth
                onClick={() => verifyIUC(IUC)}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            ) : (
              <Button onClick={()=>setStep('password')} fullWidth>
                Continue
              </Button>
            )}

          </form>
        </CardContent>
      </Card>

    </div>
  )};

   const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
          Transaction Details
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Network:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Phone Number:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white"></span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Amount:</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">₦</span>
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

  
  const renderSuccess = () => (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
        <CheckCircleIcon size={32} />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Recharge Successful</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
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
        <Button variant="outline"  fullWidth>
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
      <p className="text-sm text-red-600 dark:text-red-400"></p>
      <div className="flex space-x-3 mt-4">
        <Button variant="outline"  fullWidth>
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
    <>
    {renderStep()}
    </>
  )
};
