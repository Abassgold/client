'use client';
import React from 'react';
import { WifiIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import ComingSoon from '../cominSoon/ComingSoon';
export const DataBundles: React.FC = () => {
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
  const dataBundles = [{
    id: 1,
    name: 'Daily',
    data: '1GB',
    validity: '1 Day',
    price: '₦300',
    popular: false
  }, {
    id: 2,
    name: 'Weekly',
    data: '3GB',
    validity: '7 Days',
    price: '₦1,000',
    popular: false
  }, {
    id: 3,
    name: 'Monthly',
    data: '10GB',
    validity: '30 Days',
    price: '₦2,500',
    popular: true
  }, {
    id: 4,
    name: 'Monthly Plus',
    data: '20GB',
    validity: '30 Days',
    price: '₦5,000',
    popular: false
  }, {
    id: 5,
    name: 'Quarterly',
    data: '100GB',
    validity: '90 Days',
    price: '₦15,000',
    popular: false
  }, {
    id: 6,
    name: 'Annual',
    data: '500GB',
    validity: '365 Days',
    price: '₦50,000',
    popular: false
  }];
  return <div>
    <ComingSoon/>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Data Bundles
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Data</CardTitle>
              <CardDescription>
                Select a network and enter details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="Network Provider" options={networks} fullWidth required />
                <Input label="Phone Number" type="tel" placeholder="Enter phone number" leftIcon={<WifiIcon size={16} />} fullWidth required />
                <Button fullWidth>Continue</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
            Available Data Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataBundles.map(bundle => <Card key={bundle.id} className={`${bundle.popular ? 'border-teal-500 dark:border-teal-600 border-2' : ''}`}>
                <CardContent className="p-4">
                  {bundle.popular && <div className="absolute -top-3 right-4 bg-teal-700 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 mb-3">
                      <WifiIcon size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                      {bundle.name}
                    </h3>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {bundle.data}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Valid for {bundle.validity}
                    </p>
                    <p className="text-lg font-medium text-teal-700 dark:text-teal-400 mb-4">
                      {bundle.price}
                    </p>
                    <Button fullWidth>Select Plan</Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
};