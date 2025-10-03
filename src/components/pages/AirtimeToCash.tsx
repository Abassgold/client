import React from 'react';
import { RefreshCcwIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
export const AirtimeToCash: React.FC = () => {
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
  const banks = [{
    value: '',
    label: 'Select Bank'
  }, {
    value: 'access',
    label: 'Access Bank'
  }, {
    value: 'gtb',
    label: 'Guaranty Trust Bank'
  }, {
    value: 'zenith',
    label: 'Zenith Bank'
  }, {
    value: 'uba',
    label: 'United Bank for Africa'
  }, {
    value: 'firstbank',
    label: 'First Bank'
  }];
  return <div>
      <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
        Airtime to Cash
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Convert Airtime to Cash</CardTitle>
              <CardDescription>
                We buy your airtime at competitive rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                  Important Information
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-500 list-disc pl-5 space-y-1">
                  <li>We buy airtime at 70% - 80% rate depending on network</li>
                  <li>Minimum conversion amount is ₦1,000</li>
                  <li>Maximum conversion amount is ₦50,000 per transaction</li>
                  <li>
                    Transactions are processed within 30 minutes during business
                    hours
                  </li>
                </ul>
              </div>
              <form className="space-y-4">
                <Select label="Network Provider" options={networks} fullWidth required />
                <Input label="Phone Number (with airtime)" type="tel" placeholder="Enter phone number" fullWidth required />
                <Input label="Airtime Amount (₦)" type="number" placeholder="Enter airtime amount" leftIcon={<span className="text-secondary-500">₦</span>} fullWidth required />
                <div className="py-4">
                  <div className="flex items-center justify-between p-4 bg-secondary-100 dark:bg-secondary-800 rounded-md">
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      You will receive:
                    </span>
                    <span className="text-lg font-bold text-primary-700 dark:text-primary-400">
                      ₦8,000.00
                    </span>
                  </div>
                </div>
                <div className="border-t border-secondary-200 dark:border-secondary-800 pt-4">
                  <h3 className="text-sm font-medium text-secondary-900 dark:text-white mb-3">
                    Bank Account Details
                  </h3>
                  <div className="space-y-4">
                    <Select label="Bank" options={banks} fullWidth required />
                    <Input label="Account Number" type="text" placeholder="Enter account number" fullWidth required />
                    <Input label="Account Name" type="text" placeholder="Enter account name" fullWidth disabled value="John Doe" />
                  </div>
                </div>
                <Button fullWidth>Proceed with Conversion</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Conversion Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 mr-3">
                        <RefreshCcwIcon size={16} />
                      </div>
                      <span className="text-sm font-medium text-secondary-900 dark:text-white">
                        MTN
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      80%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-700 dark:text-red-400 mr-3">
                        <RefreshCcwIcon size={16} />
                      </div>
                      <span className="text-sm font-medium text-secondary-900 dark:text-white">
                        Airtel
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      80%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 mr-3">
                        <RefreshCcwIcon size={16} />
                      </div>
                      <span className="text-sm font-medium text-secondary-900 dark:text-white">
                        Glo
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      75%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3">
                        <RefreshCcwIcon size={16} />
                      </div>
                      <span className="text-sm font-medium text-secondary-900 dark:text-white">
                        9mobile
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      70%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {[1, 2, 3].map(item => <div key={item} className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-700 dark:text-orange-400 mr-3">
                          <RefreshCcwIcon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary-900 dark:text-white">
                            {item === 1 ? 'MTN' : item === 2 ? 'Airtel' : 'Glo'}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {item === 1 ? '3 hours ago' : item === 2 ? 'Yesterday' : '3 days ago'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          ₦{item * 2},000
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