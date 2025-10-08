import React, { useState } from 'react';
import { GlobeIcon, CheckCircleIcon, SmartphoneIcon, DownloadIcon, InfoIcon, MapPinIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui copy/Card';
import { Button } from '../ui copy/Button';
import { Input } from '../ui copy/Input';
import { Select } from '../ui copy/Select';
import { Badge } from '../ui copy/Badge';
import ComingSoon from '../cominSoon/ComingSoon';
export const ESim: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'purchase' | 'manage'>('purchase');
  const regions = [{
    value: '',
    label: 'Select Region'
  }, {
    value: 'africa',
    label: 'Africa'
  }, {
    value: 'asia',
    label: 'Asia'
  }, {
    value: 'europe',
    label: 'Europe'
  }, {
    value: 'northAmerica',
    label: 'North America'
  }, {
    value: 'southAmerica',
    label: 'South America'
  }, {
    value: 'oceania',
    label: 'Oceania'
  }];
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
    value: 'fr',
    label: '🇫🇷 France'
  }, {
    value: 'de',
    label: '🇩🇪 Germany'
  }, {
    value: 'ng',
    label: '🇳🇬 Nigeria'
  }, {
    value: 'za',
    label: '🇿🇦 South Africa'
  }, {
    value: 'ke',
    label: '🇰🇪 Kenya'
  }, {
    value: 'gh',
    label: '🇬🇭 Ghana'
  }];
  const dataPlans = [{
    id: 1,
    name: 'Europe Travel',
    data: '10GB',
    validity: '30 days',
    countries: '45+ countries',
    price: '₦12,000',
    popular: false,
    features: ['Covers all EU countries', '4G/5G where available', 'Tethering allowed', 'No speed throttling']
  }, {
    id: 2,
    name: 'USA & Canada',
    data: '15GB',
    validity: '30 days',
    countries: 'USA & Canada',
    price: '₦15,000',
    popular: true,
    features: ['Full coverage in USA & Canada', '5G speeds where available', 'Tethering allowed', 'Unlimited social media']
  }, {
    id: 3,
    name: 'Africa Explorer',
    data: '5GB',
    validity: '14 days',
    countries: '25+ countries',
    price: '₦8,000',
    popular: false,
    features: ['Coverage in major African countries', '4G where available', 'Tethering allowed', 'WhatsApp unlimited']
  }, {
    id: 4,
    name: 'Global Traveler',
    data: '20GB',
    validity: '60 days',
    countries: '100+ countries',
    price: '₦25,000',
    popular: false,
    features: ['Worldwide coverage', '4G/5G where available', 'Tethering allowed', 'Data sharing']
  }];
  const myEsims = [{
    id: 1,
    name: 'Europe Travel eSIM',
    iccid: '8944 0000 0000 0001',
    dataRemaining: '6.2 GB',
    dataTotal: '10 GB',
    validUntil: '12 Nov 2023',
    status: 'active',
    countries: ['France', 'Germany', 'Spain', 'Italy', '+41 more']
  }, {
    id: 2,
    name: 'USA & Canada eSIM',
    iccid: '8944 0000 0000 0002',
    dataRemaining: '0 GB',
    dataTotal: '15 GB',
    validUntil: '28 Oct 2023',
    status: 'expired',
    countries: ['United States', 'Canada']
  }, {
    id: 3,
    name: 'Global Traveler eSIM',
    iccid: '8944 0000 0000 0003',
    dataRemaining: '18.5 GB',
    dataTotal: '20 GB',
    validUntil: '15 Dec 2023',
    status: 'active',
    countries: ['Multiple Countries']
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'expired':
        return <Badge variant="danger">Expired</Badge>;
      default:
        return <Badge variant="slate">Unknown</Badge>;
    }
  };
  const renderPurchaseTab = () => <>
  <ComingSoon/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Get an eSIM</CardTitle>
              <CardDescription>
                Purchase an eSIM for international travel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Select label="Region" options={regions} fullWidth required />
                <Select label="Country" options={countries} fullWidth required />
                <Input label="Travel Dates" type="text" placeholder="e.g. Nov 10 - Nov 20" fullWidth />
                <Button fullWidth>Find eSIM Plans</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>eSIM Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Check if your device supports eSIM technology. Most newer
                smartphones are compatible.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircleIcon size={16} className="text-green-600 dark:text-green-500 mr-2" />
                  <span className="text-sm">iPhone XS and newer</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon size={16} className="text-green-600 dark:text-green-500 mr-2" />
                  <span className="text-sm">Samsung Galaxy S20 and newer</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon size={16} className="text-green-600 dark:text-green-500 mr-2" />
                  <span className="text-sm">Google Pixel 3 and newer</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon size={16} className="text-green-600 dark:text-green-500 mr-2" />
                  <span className="text-sm">Many newer Android phones</span>
                </div>
              </div>
              <Button variant="outline" className="mt-4" fullWidth>
                Check Your Device
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
            Popular eSIM Data Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataPlans.map(plan => <Card key={plan.id} className={`${plan.popular ? 'border-teal-500 dark:border-teal-600 border-2' : ''}`}>
                <CardContent className="p-4">
                  {plan.popular && <div className="absolute -top-3 right-4 bg-teal-700 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-4">
                      <GlobeIcon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                        {plan.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <MapPinIcon size={14} className="text-slate-500 mr-1" />
                        <p className="text-xs text-slate-500">
                          {plan.countries}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Data
                          </p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {plan.data}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Validity
                          </p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {plan.validity}
                          </p>
                        </div>
                      </div>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                        {plan.features.map((feature, index) => <li key={index} className="flex items-center mb-1">
                            <CheckCircleIcon size={12} className="text-green-600 dark:text-green-500 mr-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>)}
                      </ul>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-medium text-teal-700 dark:text-teal-400">
                          {plan.price}
                        </p>
                        <Button>Purchase</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How eSIM Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mx-auto mb-3">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    1. Purchase
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Choose a plan that fits your travel needs and complete your
                    purchase
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mx-auto mb-3">
                    <DownloadIcon size={24} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    2. Install
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Scan the QR code or download the eSIM profile to your device
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mx-auto mb-3">
                    <SmartphoneIcon size={24} />
                  </div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    3. Activate
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Activate your eSIM when you arrive at your destination and
                    enjoy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
  const renderManageTab = () => <>
  <ComingSoon/>
      <Card>
        <CardHeader>
          <CardTitle>My eSIMs</CardTitle>
          <CardDescription>Manage your purchased eSIMs</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {myEsims.map(esim => <div key={esim.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3">
                      <InfoIcon size={18} />
                    </div>
                    <div>
                      <p className="text-base font-medium text-slate-900 dark:text-white">
                        {esim.name}
                      </p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-slate-500 mr-3">
                          ICCID: {esim.iccid}
                        </p>
                        {getStatusBadge(esim.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center text-slate-700 dark:text-slate-300">
                      <InfoIcon size={14} className="mr-1" />
                      <span className="text-xs">
                        Valid until: {esim.validUntil}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <Button size="sm" variant="outline">
                        QR Code
                      </Button>
                      {esim.status === 'active' ? <Button size="sm">Top Up</Button> : <Button size="sm">Reactivate</Button>}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <MapPinIcon size={14} className="text-slate-500 mr-1" />
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {esim.countries.join(', ')}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {esim.dataRemaining} remaining of {esim.dataTotal}
                    </p>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{
                  width: `${esim.status === 'active' ? parseFloat(esim.dataRemaining) / parseFloat(esim.dataTotal.split(' ')[0]) * 100 : 0}%`
                }}></div>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                  <CheckCircleIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    Turn on Data Roaming
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Make sure data roaming is enabled in your device settings
                    for the eSIM profile.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                  <CheckCircleIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    Set as Data Line
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    In dual SIM settings, set your eSIM as the preferred data
                    line when traveling.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 flex-shrink-0">
                  <CheckCircleIcon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    Monitor Usage
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Keep track of your data usage through the FloZap app to
                    avoid unexpected charges.
                  </p>
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
                Buy New eSIM
              </Button>
              <Button fullWidth variant="outline" size="lg">
                Top Up Data
              </Button>
              <Button fullWidth variant="outline" size="lg">
                View QR Codes
              </Button>
              <Button fullWidth variant="outline" size="lg">
                Usage History
              </Button>
              <Button fullWidth variant="teal" size="lg" className="col-span-2">
                Installation Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>;
  return <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            eSIM Data Plans
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Stay connected globally with our travel eSIMs
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant={selectedTab === 'purchase' ? 'teal' : 'outline'} onClick={() => setSelectedTab('purchase')}>
            Buy eSIM
          </Button>
          <Button variant={selectedTab === 'manage' ? 'teal' : 'outline'} onClick={() => setSelectedTab('manage')}>
            Manage eSIMs
          </Button>
        </div>
      </div>
      {selectedTab === 'purchase' ? renderPurchaseTab() : renderManageTab()}
    </div>;
};
const ShoppingBag: React.FC<{
  size: number;
}> = ({
  size
}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>;