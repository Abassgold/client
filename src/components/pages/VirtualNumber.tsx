import React, { useState } from 'react';
import { GlobeIcon, PhoneIcon, SearchIcon, PlusCircleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
export const VirtualNumber: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'purchase' | 'manage'>('purchase');
  const countries = [{
    value: '',
    label: 'Select Country'
  }, {
    value: 'us',
    label: '🇺🇸 United States'
  }, {
    value: 'uk',
    label: '🇬🇧 United Kingdom'
  }, {
    value: 'ca',
    label: '🇨🇦 Canada'
  }, {
    value: 'au',
    label: '🇦🇺 Australia'
  }, {
    value: 'ng',
    label: '🇳🇬 Nigeria'
  }, {
    value: 'za',
    label: '🇿🇦 South Africa'
  }];
  const purposes = [{
    value: '',
    label: 'Select Purpose'
  }, {
    value: 'personal',
    label: 'Personal Use'
  }, {
    value: 'business',
    label: 'Business'
  }, {
    value: 'verification',
    label: 'Account Verification'
  }, {
    value: 'privacy',
    label: 'Privacy'
  }];
  const availableNumbers = [{
    id: 1,
    number: '+1 (234) 567-8901',
    country: 'United States',
    price: '₦3,500/month'
  }, {
    id: 2,
    number: '+1 (345) 678-9012',
    country: 'United States',
    price: '₦3,500/month'
  }, {
    id: 3,
    number: '+1 (456) 789-0123',
    country: 'United States',
    price: '₦3,500/month'
  }, {
    id: 4,
    number: '+44 7700 900123',
    country: 'United Kingdom',
    price: '₦4,200/month'
  }, {
    id: 5,
    number: '+44 7700 900456',
    country: 'United Kingdom',
    price: '₦4,200/month'
  }, {
    id: 6,
    number: '+234 801 234 5678',
    country: 'Nigeria',
    price: '₦2,500/month'
  }];
  const myNumbers = [{
    id: 1,
    number: '+1 (234) 567-8901',
    country: 'United States',
    status: 'active',
    expiryDate: '12 Dec 2023',
    sms: 32,
    calls: 14
  }, {
    id: 2,
    number: '+44 7700 900123',
    country: 'United Kingdom',
    status: 'active',
    expiryDate: '28 Nov 2023',
    sms: 17,
    calls: 8
  }, {
    id: 3,
    number: '+234 801 234 5678',
    country: 'Nigeria',
    status: 'expired',
    expiryDate: '10 Oct 2023',
    sms: 56,
    calls: 23
  }];
  const plans = [{
    id: 1,
    name: 'Basic',
    price: '₦2,500',
    period: 'per month',
    features: ['1 Virtual Number', '100 SMS/month', '60 Minutes Call Time', 'Web Dashboard Access'],
    popular: false
  }, {
    id: 2,
    name: 'Standard',
    price: '₦5,000',
    period: 'per month',
    features: ['2 Virtual Numbers', 'Unlimited SMS', '200 Minutes Call Time', 'Web & Mobile App Access', 'Call Forwarding'],
    popular: true
  }, {
    id: 3,
    name: 'Premium',
    price: '₦10,000',
    period: 'per month',
    features: ['5 Virtual Numbers', 'Unlimited SMS', 'Unlimited Call Time', 'Web & Mobile App Access', 'Call Forwarding & Recording', 'API Access'],
    popular: false
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'expired':
        return <Badge variant="danger">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  const renderPurchaseTab = () => <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Get a Virtual Number</CardTitle>
              <CardDescription>
                Purchase a virtual phone number for any country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="Country" options={countries} fullWidth required />
                <Select label="Purpose" options={purposes} fullWidth required />
                <div className="relative">
                  <Input label="Search for a specific area code (optional)" type="text" placeholder="e.g. 212, 415" fullWidth />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6">
                    <SearchIcon size={16} className="text-secondary-500" />
                  </div>
                </div>
                <Button fullWidth>Search Available Numbers</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Available Numbers</CardTitle>
                <CardDescription>Select a number to purchase</CardDescription>
              </div>
              <Select options={[{
              value: 'all',
              label: 'All Countries'
            }, {
              value: 'us',
              label: 'United States'
            }, {
              value: 'uk',
              label: 'United Kingdom'
            }, {
              value: 'ng',
              label: 'Nigeria'
            }]} className="w-48" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {availableNumbers.map(item => <div key={item.id} className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3">
                          <GlobeIcon size={18} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-secondary-900 dark:text-white">
                            {item.number}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {item.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-primary-700 dark:text-primary-400 mr-4">
                          {item.price}
                        </p>
                        <Button size="sm" icon={<PlusCircleIcon size={14} />}>
                          Purchase
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-secondary-200 dark:border-secondary-800">
              <Button variant="ghost" size="sm">
                Load More Numbers
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <h2 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
        Subscription Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => <Card key={plan.id} className={`${plan.popular ? 'border-primary-500 dark:border-primary-600 border-2' : ''}`}>
            <CardContent className="p-6">
              {plan.popular && <div className="absolute -top-3 right-4 bg-primary-700 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>}
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-secondary-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-secondary-500">
                  {' '}
                  {plan.period}
                </span>
              </div>
              <div className="border-t border-secondary-200 dark:border-secondary-800 pt-4 mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-start">
                      <CheckCircleIcon size={16} className="text-green-600 dark:text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-secondary-700 dark:text-secondary-300">
                        {feature}
                      </span>
                    </li>)}
                </ul>
              </div>
              <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>)}
      </div>
    </>;
  const renderManageTab = () => <>
      <Card>
        <CardHeader>
          <CardTitle>My Virtual Numbers</CardTitle>
          <CardDescription>Manage your virtual phone numbers</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-secondary-200 dark:divide-secondary-800">
            {myNumbers.map(item => <div key={item.id} className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3">
                      <PhoneIcon size={18} />
                    </div>
                    <div>
                      <p className="text-base font-medium text-secondary-900 dark:text-white">
                        {item.number}
                      </p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-secondary-500 mr-3">
                          {item.country}
                        </p>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                      <ClockIcon size={14} className="mr-1" />
                      <span className="text-xs">
                        Expires: {item.expiryDate}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Button size="sm" variant="outline">
                        View Activity
                      </Button>
                      {item.status === 'active' ? <Button size="sm">Renew</Button> : <Button size="sm">Reactivate</Button>}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:w-1/2">
                  <div className="bg-secondary-100 dark:bg-secondary-800/50 rounded-md p-2 text-center">
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      SMS Received
                    </p>
                    <p className="text-lg font-medium text-secondary-900 dark:text-white">
                      {item.sms}
                    </p>
                  </div>
                  <div className="bg-secondary-100 dark:bg-secondary-800/50 rounded-md p-2 text-center">
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      Calls
                    </p>
                    <p className="text-lg font-medium text-secondary-900 dark:text-white">
                      {item.calls}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">
                    SMS Usage
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    105/200
                  </p>
                </div>
                <div className="w-full bg-secondary-200 dark:bg-secondary-800 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{
                  width: '52%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">
                    Call Minutes
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    45/120
                  </p>
                </div>
                <div className="w-full bg-secondary-200 dark:bg-secondary-800 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: '37%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">
                    Numbers Limit
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    2/3
                  </p>
                </div>
                <div className="w-full bg-secondary-200 dark:bg-secondary-800 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{
                  width: '66%'
                }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button fullWidth variant="outline" size="lg">
                Forward Calls
              </Button>
              <Button fullWidth variant="outline" size="lg">
                Auto-Reply SMS
              </Button>
              <Button fullWidth variant="outline" size="lg">
                Call History
              </Button>
              <Button fullWidth variant="outline" size="lg">
                SMS History
              </Button>
              <Button fullWidth variant="primary" size="lg" className="col-span-2">
                Add New Number
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>;
  return <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Virtual Phone Numbers
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Get phone numbers from different countries
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant={selectedTab === 'purchase' ? 'primary' : 'outline'} onClick={() => setSelectedTab('purchase')}>
            Purchase Numbers
          </Button>
          <Button variant={selectedTab === 'manage' ? 'primary' : 'outline'} onClick={() => setSelectedTab('manage')}>
            Manage Numbers
          </Button>
        </div>
      </div>
      {selectedTab === 'purchase' ? renderPurchaseTab() : renderManageTab()}
    </div>;
};