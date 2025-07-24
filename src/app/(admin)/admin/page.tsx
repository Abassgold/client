import React from 'react'
// import { UsersIcon, CreditCardIcon, PhoneIcon, WifiIcon } from 'lucide-react'
import {  statType } from './adminTypes'
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
type recentTransactions ={
  beneficiary: string;
  	serviceType: string;	 
    amount: number
     createdAt: Date;
}
interface dashboardResponse{
  recentActivity:recentTransactions[];
  stats:statType[]
}
const Dashboard = async () => {
  const token = (await cookies()).get('accessToken')?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if(res.status===401) redirect('/login')
    const data: dashboardResponse = await res.json();
  // const iconMap = {
  //   user: UsersIcon,
  //   sms: PhoneIcon,
  //   usdt: CreditCardIcon,
  //   esim: WifiIcon
  // }
  return (
    <div className='w-full'>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((item) =>{
           return (
            <Link
              key={item.name}
              href={''}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* <item.icon
                      className="h-6 w-6 text-teal-600"
                      aria-hidden="true"
                    /> */}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {item.stat}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div
                className={`bg-gray-50 px-5 py-3 ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
              >
                <div className="text-sm">{item.change} from last month</div>
              </div>
            </Link>
          )})}
        </div>
      </div>
      <h2 className="mt-8 text-lg font-medium text-gray-900">
        Recent Activity
      </h2>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.recentActivity.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-6 capitalize py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity.beneficiary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₦{activity.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <Link href='/admin/transactions' className=' block w-fit my-2 text-teal-800 capitalize'>view all</Link>
    </div>
  )
}

export default Dashboard;
