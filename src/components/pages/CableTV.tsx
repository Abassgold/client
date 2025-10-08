'use client';
import React from 'react';
import { TvIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui copy/Card';
import { Select } from '../ui copy/Select';
import { Input } from '../ui copy/Input';
import { Button } from '../ui copy/Button';
import ComingSoon from '../cominSoon/ComingSoon';

export const CableTV: React.FC = () => {
  const providers = [{
    value: '',
    label: 'Select Provider'
  }, {
    value: 'dstv',
    label: 'DSTV'
  }, {
    value: 'gotv',
    label: 'GOTV'
  }, {
    value: 'startimes',
    label: 'StarTimes'
  }];
  const packages = [{
    id: 1,
    name: 'DSTV Premium',
    price: '₦24,500',
    provider: 'dstv',
    features: ['All Sports Channels', 'Movies', 'Kids', 'News']
  }, {
    id: 2,
    name: 'DSTV Compact Plus',
    price: '₦16,600',
    provider: 'dstv',
    features: ['Selected Sports', 'Movies', 'Kids', 'News']
  }, {
    id: 3,
    name: 'DSTV Compact',
    price: '₦10,500',
    provider: 'dstv',
    features: ['Selected Sports', 'Movies', 'Kids', 'News']
  }, {
    id: 4,
    name: 'GOTV Max',
    price: '₦4,850',
    provider: 'gotv',
    features: ['Selected Sports', 'Movies', 'Kids', 'News']
  }, {
    id: 5,
    name: 'GOTV Jinja',
    price: '₦2,250',
    provider: 'gotv',
    features: ['Limited Sports', 'Selected Movies', 'Kids', 'News']
  }, {
    id: 6,
    name: 'StarTimes Classic',
    price: '₦2,600',
    provider: 'startimes',
    features: ['News', 'Movies', 'Kids', 'Documentaries']
  }];
  return <div>
    <ComingSoon/>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Cable TV Subscription
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Renew Subscription</CardTitle>
              <CardDescription>Enter your decoder details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="TV Provider" options={providers} fullWidth required />
                <Input label="Smart Card / IUC Number" type="text" placeholder="Enter decoder number" leftIcon={<TvIcon size={16} />} fullWidth required />
                <Input label="Phone Number" type="tel" placeholder="Enter phone number" fullWidth required />
                <Button fullWidth>Verify</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
            Popular Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map(pkg => <Card key={pkg.id}>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400 mr-4">
                      <TvIcon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {providers.find(p => p.value === pkg.provider)?.label}
                      </p>
                      <p className="text-lg font-medium text-teal-700 dark:text-teal-400 mb-3">
                        {pkg.price}{' '}
                        <span className="text-sm text-slate-500">
                          / month
                        </span>
                      </p>
                      <div className="mb-4">
                        <ul className="text-sm text-slate-600 dark:text-slate-400">
                          {pkg.features.map((feature, index) => <li key={index} className="flex items-center mb-1">
                              <span className="w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full mr-2"></span>
                              {feature}
                            </li>)}
                        </ul>
                      </div>
                      <Button fullWidth>Select Package</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
};