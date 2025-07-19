import { UserIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const TotalUser = async() => {
    const changeType = 'increase'
    const res = await fetch(`{}`)
    if(!res.ok) redirect('/login')
  return (
    <div
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserIcon
                      className="h-6 w-6 text-teal-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          5,271
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div
                className={`bg-gray-50 px-5 py-3 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
              >
                <div className="text-sm">+12% from last month</div>
              </div>
            </div>
  )
}

export default TotalUser