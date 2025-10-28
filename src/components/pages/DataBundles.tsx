'use client';
import React, { useState } from 'react';
import { WifiIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import dataPlans from '@/lib/dataplan/dataplans';

type NetworkType = 'MTN' | 'Airtel' | 'Glo' | '9Mobile' | '';

interface networksType {
  value: NetworkType;
  label: string;
}

type DataType = {
  size: string;
  price: number;
  validity: string;
  plan_id: number;
};

export const DataBundles = () => {
  const [selectPlan, setSelectPlan] = useState<DataType[] | undefined>(undefined);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('');

  const networks: networksType[] = [
    { value: '', label: 'Select Network' },
    { value: 'MTN', label: 'MTN' },
    { value: 'Airtel', label: 'Airtel' },
    { value: 'Glo', label: 'Glo' },
    { value: '9Mobile', label: '9Mobile' },
  ];

  const selectNetWork = (network: NetworkType) => {
    setSelectedNetwork(network);
    if (network && dataPlans[network]) {
      setSelectPlan(dataPlans[network]);
    } else {
      setSelectPlan(undefined);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Data Bundles</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE FORM */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Data</CardTitle>
              <CardDescription>Select a network and enter details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                {/* NETWORK SELECT */}
                <div>
                  <label
                    htmlFor="network"
                    className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1"
                  >
                    Network Provider
                  </label>
                  <div className="relative">
                    <select
                      id="network"
                      name="network"
                      value={selectedNetwork}
                      onChange={(e) => selectNetWork(e.target.value as NetworkType)}
                      className="block w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 
                        focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-600 dark:focus:border-teal-600 
                        rounded-md shadow-sm py-2 pl-3 pr-10 text-slate-900 dark:text-white sm:text-sm appearance-none"
                      required
                    >
                      {networks.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-slate-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Please select your network provider.</p>
                </div>

                {/* PHONE INPUT */}
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  leftIcon={<WifiIcon size={16} />}
                  fullWidth
                  required
                />
                <Button fullWidth>Continue</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE PLANS */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
            Available Data Plans
          </h2>

          {!selectPlan ? (
            <p className="text-slate-500 text-sm">Select a network to view available plans.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectPlan.map((bundle) => (
                <Card
                  key={bundle.plan_id}
                  className="border-teal-500 dark:border-teal-600 border-2"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 mb-3">
                        <WifiIcon size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                        {bundle.size}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Valid for {bundle.validity}
                      </p>
                      <p className="text-lg font-medium text-teal-700 dark:text-teal-400 mb-4">
                        ₦{bundle.price}
                      </p>
                      <Button fullWidth>Select Plan</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
