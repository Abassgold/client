import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../ui copy/Card'

type activationType = {
  activationId: string;
  number: string;
  name: string;
  cost: number;
  code?: string;
  country: string;
  updatedAt: Date;
  status: string;
}
type responseType = {
  ok: boolean;
  msg?: string;
  activation?: activationType[]
}
const SmsHistory: React.FC = async () => {
  const token = (await cookies()).get('accessToken')?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/getActivationInfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (res.status === 401) return redirect('/login')
  if (res.status === 403) return redirect('/account-suspended')
  const data: responseType = await res.json()
  if (!data.ok) return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Number Purchase History</CardTitle>
          <CardDescription>
            View all your purchased virtual numbers
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {data.msg}
      </CardContent>
    </Card>
  )
  return (
    <Card>
      <CardHeader >
        <div>
          <CardTitle>Number Purchase History</CardTitle>
          <CardDescription>
            View all your purchased virtual numbers
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase">
                <th className="px-4 py-3 text-left font-medium">Ref No.</th>
                <th className="px-4 py-3 text-left font-medium">Country</th>
                <th className="px-4 py-3 text-left font-medium">Number</th>
                <th className="px-4 py-3 text-left font-medium">Code</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {data.activation?.map((item, index) => (
                <tr
                  key={item.activationId}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}`}
                >
                  <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {item.activationId}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {item.country}
                    <small className="block">{item.name}</small>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-900 dark:text-white">
                    {item.number}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {item.code ? item.code : ''}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-teal-700 dark:text-teal-400">
                    ₦{item.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default SmsHistory;