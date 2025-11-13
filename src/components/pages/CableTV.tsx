'use client';
import React, { useState } from 'react';
import { TvIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui copy/Card';
import { Input } from '../ui copy/Input';
import { Button } from '../ui copy/Button';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';

import { CableType, tvPlans } from '../tv/tvplans';
type packageType =
  | "GOTV"
  | "DSTV"
  | "STARTIMES"
  | ''
type Verify = {
  ok: boolean;
  invalid: boolean;
  msg: string;
};




export const CableTV: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [cable, setCable] = useState<CableType | null>(null)
  console.log(cable)
  const [plan, setPlan] = useState<packageType>('')
  const [IUC, setIUC] = useState('')
  const [verify, setVerify] = useState<Verify>({
    ok: false,
    invalid: true,
    msg: ''
  })
  const providers = [
    {
      value: '',
      label: 'Select Plan'
    }, {
      value: 'DSTV',
      label: 'DSTV'
    }, {
      value: 'GOTV',
      label: 'GOTV'
    }, {
      value: 'STARTIME',
      label: 'StarTimes'
    }];
  const verifyIUC = async (input: string) => {
    if (!input || !plan) return;
    setIsLoading(true)
    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cable/validate`,
        {
          IUC: input,
          plan
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
      );
      setVerify(prev => ({
        ...prev,
        ok: response.data.ok,
        invalid: response.data.invalid,
        msg: response.data.msg
      }));

    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify
      setVerify(prev => ({
        ...prev,
        ok: errorResponse.ok,
        invalid: errorResponse.invalid,
        msg: errorResponse.msg
      }));
    } finally {
      setIsLoading(false)
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post<Verify>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cable/subscribe`,
        {
          
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
      console.log(error);
      const err = error as AxiosError;
      const errorResponse = err.response?.data as Verify
      alert(errorResponse ?? 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const chosePlan = (input: string) => {
    const result = tvPlans[plan].find(item => item.id === input)
    setCable(result ?? null)
  }

  // const renderPassword = () => <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
  //   <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
  //     <div className="space-y-4">
  //       <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
  //         <form onSubmit={handleConfirm}>
  //           <div className="space-y-4">
  //             <Input
  //               label="Transaction PIN"
  //               type="tel"
  //               placeholder="Enter your PIN"
  //               value={formData.pin}
  //               onChange={(e) => handleChange('pin', e.target.value)}
  //               leftIcon={<Lock size={16} />}
  //               fullWidth
  //               required
  //               minLength={4}
  //               maxLength={4}
  //             />
  //             <div className="flex space-x-3">
  //               <Button variant="outline" onClick={() => setStep('form')} fullWidth>
  //                 Cancel
  //               </Button>
  //               <Button type='submit' fullWidth>
  //                 {isLoading ? 'Wait...' : 'Submit'}
  //               </Button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  return <div className='max-w-2xl mx-auto'>
    {/* <ComingSoon/> */}
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
      Cable TV Subscription
    </h1>
    <div className="">
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>Renew Subscription</CardTitle>
            <CardDescription>Enter your decoder details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                  TV Provider
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as packageType)}
                  className="block sm:text-sm w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
                >
                  {providers.map(item => (
                    <option value={item.value} key={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <Input
                disabled={!plan}
                label="Smart Card / IUC Number"
                type="text"
                placeholder="Enter decoder number"
                leftIcon={<TvIcon size={16} />}
                fullWidth
                onChange={e => setIUC(e.target.value)}
                required />
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                  Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => chosePlan(e.target.value)}
                  className="block sm:text-sm w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
                >
                  {plan && tvPlans[plan]?.map((item) => (
                    <option value={item.id} key={item.id}>{item.package}, ₦{item.price}</option>
                  ))}
                </select>
              </div>
              {verify && verify.ok && (
                <Input className={`${verify.invalid && 'bg-red-200 text-red-600'} bg-red-700`} label='Customer Name' type="tel" placeholder={verify.msg} fullWidth required disabled />
              )}
              {!verify.ok || verify.invalid ? (
                <Button
                  disabled={isLoading || !IUC || !plan}
                  fullWidth
                  onClick={() => verifyIUC(IUC)}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                >
                  {'Continue'}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>;
};