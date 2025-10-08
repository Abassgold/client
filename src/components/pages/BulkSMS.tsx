'use client';
import React from 'react';
import { MessageSquareIcon, UploadIcon, UsersIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui copy/Card';
import { Select } from '../ui copy/Select';
import { Input } from '../ui copy/Input';
import { Button } from '../ui copy/Button';
import ComingSoon from '../cominSoon/ComingSoon';
export const BulkSMS: React.FC = () => {
  const senderOptions = [{
    value: '',
    label: 'Select Sender ID'
  }, {
    value: 'flozap',
    label: 'FloZap'
  }, {
    value: 'info',
    label: 'INFO'
  }, {
    value: 'alert',
    label: 'ALERT'
  }, {
    value: 'custom',
    label: 'Custom Sender ID'
  }];
  const pricingPlans = [{
    id: 1,
    name: 'Basic',
    price: '₦2.5',
    unit: 'per SMS',
    features: ['Up to 1,000 SMS', 'Standard Delivery', 'Basic Analytics']
  }, {
    id: 2,
    name: 'Standard',
    price: '₦2.0',
    unit: 'per SMS',
    features: ['Up to 10,000 SMS', 'Priority Delivery', 'Advanced Analytics', 'Scheduled Delivery']
  }, {
    id: 3,
    name: 'Premium',
    price: '₦1.5',
    unit: 'per SMS',
    features: ['Unlimited SMS', 'Premium Delivery', 'Comprehensive Analytics', 'Scheduled Delivery', 'Custom Sender ID']
  }];
  return <div>
    <ComingSoon/>
      <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
        Bulk SMS
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Bulk SMS</CardTitle>
              <CardDescription>
                Reach multiple recipients with a single message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="Sender ID" options={senderOptions} fullWidth required />
                {senderOptions.find(option => option.value === 'custom')?.value === 'custom' && <Input label="Custom Sender ID" type="text" placeholder="Enter custom sender ID (max 11 characters)" maxLength={11} fullWidth required />}
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-200 mb-1">
                    Recipients
                  </label>
                  <div className="flex items-center space-x-2 mb-2">
                    <Button variant="outline" size="sm" icon={<UploadIcon size={14} />}>
                      Upload CSV
                    </Button>
                    <Button variant="outline" size="sm" icon={<UsersIcon size={14} />}>
                      Select Group
                    </Button>
                  </div>
                  <textarea placeholder="Enter phone numbers separated by comma or new line" className="w-full h-24 px-3 py-2 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 text-secondary-900 dark:text-white" />
                  <p className="mt-1 text-xs text-secondary-500">
                    Enter phone numbers in international format (e.g.
                    +2348012345678)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-secondary-200 mb-1">
                    Message
                  </label>
                  <textarea placeholder="Enter your message" className="w-full h-32 px-3 py-2 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 text-secondary-900 dark:text-white" />
                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-xs text-secondary-500">
                      Characters: 0/160
                    </p>
                    <p className="text-xs text-secondary-500">Pages: 1</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary-100 dark:bg-secondary-800 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                      Recipients: <span className="font-bold">0</span>
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Estimated cost:{' '}
                      <span className="font-bold text-primary-700 dark:text-primary-400">
                        ₦0.00
                      </span>
                    </p>
                  </div>
                  <Button>Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pricing Plans</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {pricingPlans.map(plan => <div key={plan.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-secondary-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <div>
                        <span className="text-lg font-bold text-primary-700 dark:text-primary-400">
                          {plan.price}
                        </span>
                        <span className="text-xs text-secondary-500">
                          {' '}
                          {plan.unit}
                        </span>
                      </div>
                    </div>
                    <ul className="text-sm text-secondary-600 dark:text-secondary-400 space-y-1 mb-3">
                      {plan.features.map((feature, index) => <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-secondary-400 dark:bg-secondary-600 rounded-full mr-2"></span>
                          {feature}
                        </li>)}
                    </ul>
                    <Button variant="outline" fullWidth>
                      Select Plan
                    </Button>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SMS History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {[1, 2, 3].map(item => <div key={item} className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-700 dark:text-pink-400 mr-3">
                        <MessageSquareIcon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                          {item === 1 ? 'Marketing Campaign' : item === 2 ? 'Event Reminder' : 'Payment Notification'}
                        </p>
                        <p className="text-xs text-secondary-500">
                          {item === 1 ? '2 hours ago' : item === 2 ? 'Yesterday' : 'Last week'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-secondary-900 dark:text-white">
                          {item * 50} SMS
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