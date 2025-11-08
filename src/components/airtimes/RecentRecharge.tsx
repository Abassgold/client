import React from 'react'
import { Card, CardContent, CardFooter } from '../ui copy/Card'
import { PhoneIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface airtImeRes {
  ok: boolean;
  airtime: {
    _id: string;
    amount: number;
    mobile_number: string;
    updatedAt: Date;
  }[],
  msg?: string;
}
const getTimeAgo = (date: string | Date) => {
  const now = new Date();
  const updated = new Date(date);
  const diffMs = now.getTime() - updated.getTime(); // difference in milliseconds

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

        const formattedNumber = (mobile_number: string)=> mobile_number.replace(/^0/, '+234')

const RecentRecharge = async () => {
  const token = (await cookies()).get('accessToken')?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/airtimes/recent-airtime-transactions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (res.status === 401) return redirect('/login')
  if (res.status === 403) return redirect('/account-suspended')
  const data: airtImeRes = await res.json()
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
        Recent Recharges
      </h2>
      {!data.ok ? (
        <Card>
          <CardContent className="p-0 text-slate-900 dark:text-white text-center">
            {data.msg}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {data.airtime.map((item) => <div key={item._id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3">
                    <PhoneIcon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {formattedNumber(item.mobile_number)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getTimeAgo(item.updatedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      ₦{item.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Successful
                    </p>
                  </div>
                </div>
              </div>)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm">
              <Link href='/user/transactions'>
                View All Transactions
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default RecentRecharge;