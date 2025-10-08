'use client';
import React from 'react';
import { ZapIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import ComingSoon from '../cominSoon/ComingSoon';
export const ElectricityBill: React.FC = () => {
  const providers = [{
    value: '',
    label: 'Select Provider'
  }, {
    value: 'ikeja',
    label: 'Ikeja Electric'
  }, {
    value: 'eko',
    label: 'Eko Electric'
  }, {
    value: 'ibedc',
    label: 'IBEDC'
  }, {
    value: 'phed',
    label: 'Port Harcourt Electric'
  }, {
    value: 'aedc',
    label: 'Abuja Electric'
  }];
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
  return <div>
    <ComingSoon/>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Electricity Bill Payment
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pay Electricity Bill</CardTitle>
              <CardDescription>Enter your meter details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="Electricity Provider" options={providers} fullWidth required />
                <Select label="Meter Type" options={meterTypes} fullWidth required />
                <Input label="Meter Number" type="text" placeholder="Enter meter number" leftIcon={<ZapIcon size={16} />} fullWidth required />
                <Input label="Phone Number" type="tel" placeholder="Enter phone number" fullWidth required />
                <Input label="Amount (₦)" type="number" placeholder="Enter amount" leftIcon={<span className="text-slate-500">₦</span>} fullWidth required />
                <Button fullWidth>Verify Meter</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Meter Information</CardTitle>
              <CardDescription>
                Your meter details will appear here after verification
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <ZapIcon size={32} />
              </div>
              <p className="text-slate-600 dark:text-slate-400">
              Enter your meter details and click &quot;Verify Meter&quot; to see information

              </p>
            </CardContent>
          </Card>
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