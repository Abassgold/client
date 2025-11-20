'use client';
import React, { useState } from 'react';
import { CheckCircleIcon, Lock, XCircleIcon, ZapIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
import Link from 'next/link';
type Verify = {
  invalid: boolean,
  name: string;
  address: string;
};


export const ElectricityBill: React.FC = () => {
  const [step, setStep] = useState('form')
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [meter_number, setMeter_number] = useState('')
  const [meter_type, setMeter_type] = useState('')
  const [disco_name, setDisco_name] = useState('')
  const [verify, setVerify] = useState<Verify>({
    invalid: true,
    name: '',
    address: ''
  })


  const providers = [
    {
      id: '',
      value: '',
      label: 'Select Provider'
    },
    {
      id: '1',
      value: 'Ikeja Electric',
      label: 'Ikeja Electric'
    },
    {
      id: '2',
      value: 'Eko Electric',
      label: 'Eko Electric'
    },
    {
      id: '3',
      value: 'Abuja Electric',
      label: 'Abuja Electric'
    },
    {
      id: '4',
      value: 'Kano Electric',
      label: 'Kano Electric'
    },
    {
      id: '5',
      value: 'Enugu Electric',
      label: 'Enugu Electric'
    },
    {
      id: '6',
      value: 'Port Harcourt Electric',
      label: 'Port Harcourt Electric'
    },
    {
      id: '7',
      value: 'Ibadan Electric',
      label: 'Ibadan Electric'
    },
    {
      id: '8',
      value: 'Kaduna Electric',
      label: 'Kaduna Electric'
    },
    {
      id: '9',
      value: 'Jos Electric',
      label: 'Jos Electric'
    },
    {
      id: '10',
      value: 'Benin Electric',
      label: 'Benin Electric'
    },
    {
      id: '11',
      value: 'Yola Electric',
      label: 'Yola Electric'
    }
  ];


  const meterTypes = [{
    value: '',
    label: 'Select Meter Type'
  }, {
    value: 'prepaid',
    label: 'Prepaid'
  }, {
    value: 'postpaid',
    label: 'Postpaid'
  }];
  const verifyMeter = async () => {
    if (!meter_number || !disco_name) return;
    setIsLoading(true)
    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/electricity/validate`,
        {
          meter_number,
          disco_name,
          meter_type
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data)
      setVerify(prev => ({
        ...prev,
        invalid: response.data.invalid,
        name: response.data.name,
        address: response.data.address
      }));

    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify
      setVerify(prev => ({
        ...prev,
        invalid: errorResponse.invalid,
        name: errorResponse.name,
        address: errorResponse.address
      }));
    } finally {
      setIsLoading(false)
    }
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
     if (!meter_number || !disco_name || !amount || !pin) return;
    setIsLoading(true)
    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/electricity/buy-electricity`,
        {
          pin,
          meter_number: meter_number.replace(/\s+/g, ''),
          disco_name,
          meter_type,
          amount: amount.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data)
      setVerify(prev => ({
        ...prev,
        invalid: response.data.invalid,
        name: response.data.name,
        address: response.data.address
      }));

    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify
      setVerify(prev => ({
        ...prev,
        invalid: errorResponse.invalid,
        name: errorResponse.name,
        address: errorResponse.address
      }));
    } finally {
      setIsLoading(false)
    }
  }
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
                onChange={(e) => setPin(e.target.value)}
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

const renderForm = ()=>{
  return <div className='max-w-2xl mx-auto'>
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
      Electricity Bill Payment
    </h1>
    <div className="space-y-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Pay Electricity Bill</CardTitle>
            <CardDescription>Enter your meter details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Select
                label="Electricity Provider"
                options={providers}
                value={disco_name}
                onChange={value => setDisco_name(value)}
                fullWidth
                required
              />
              <Select
                label="Meter Type"
                options={meterTypes}
                value={meter_type}
                onChange={value => setMeter_type(value)}
                fullWidth
                required
              />
              <Input label="Meter Number" type="tel" placeholder="Enter meter number" leftIcon={<ZapIcon size={16} />} value={meter_number} fullWidth required onChange={e => setMeter_number(e.target.value)} />
              {verify.name && (
                <div className='space-y-4'>
                  <Input disabled label="Customer Name" type="text" placeholder={verify.name} fullWidth />
                  <Input disabled label="Customer Address" type="text" placeholder={verify.address} fullWidth />
                </div>
              )}
              {!verify.invalid && (
                <div className='space-y-4'>
                  {/* <Input label="Phone Number" type="tel" placeholder="Enter phone number" fullWidth required /> */}
                  <Input label="Amount (₦)" value={amount} type="number" placeholder="Enter amount" leftIcon={<span className="text-slate-500">₦</span>} fullWidth required onChange={e=>setAmount(e.target.value)}/>
                </div>
              )}
              {verify.invalid ? (
                <Button disabled={isLoading} type='button' fullWidth onClick={()=>verifyMeter()}>{isLoading ? 'Verifying...' : 'Verify Meter'}</Button>
              ) : (
                <Button disabled={isLoading} fullWidth onClick={()=>setStep('password')}>{'Continue'}</Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {[1, 2, 3].map(item => <div key={item} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 mr-3">
                    <ZapIcon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item === 1 ? 'Ikeja Electric' : item === 2 ? 'Eko Electric' : 'IBEDC'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Meter: {12345678 + item}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      ₦{item * 5},000
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {item === 1 ? '2 days ago' : item === 2 ? 'Last week' : '2 weeks ago'}
                    </p>
                  </div>
                </div>
              </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>; 
}
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