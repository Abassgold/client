'use client';
import React, { useState } from 'react';
import { ZapIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
type Verify = {
  invalid: boolean,
  name: string;
  address: string;
};


export const ElectricityBill: React.FC = () => {
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
  const handleSubmit = async() =>{
     if (!meter_number || !disco_name) return;
    setIsLoading(true)
    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/electricity/buy-electricity`,
        {
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
            <form className="space-y-4" onSubmit={handleSubmit}>
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
              <Input label="Meter Number" type="tel" placeholder="Enter meter number" leftIcon={<ZapIcon size={16} />} fullWidth required onChange={e => setMeter_number(e.target.value)} />
              {verify.name && (
                <div className='space-y-4'>
                  <Input disabled label="Customer Name" type="text" placeholder={verify.name} fullWidth />
                  <Input disabled label="Customer Address" type="text" placeholder={verify.address} fullWidth />
                </div>
              )}
              {!verify.invalid && (
                <div className='space-y-4'>
                  {/* <Input label="Phone Number" type="tel" placeholder="Enter phone number" fullWidth required /> */}
                  <Input label="Amount (₦)" type="number" placeholder="Enter amount" leftIcon={<span className="text-slate-500">₦</span>} fullWidth required onChange={e=>setAmount(e.target.value)}/>
                </div>
              )}
              {verify.invalid ? (
                <Button disabled={isLoading} type='button' fullWidth onClick={() => verifyMeter()}>{isLoading ? 'Verifying...' : 'Verify Meter'}</Button>
              ) : (
                <Button type='submit' disabled={isLoading} fullWidth>{isLoading ? 'Wait...' : 'Submit Order'}</Button>
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
};