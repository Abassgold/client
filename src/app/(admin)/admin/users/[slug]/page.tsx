
import { Phone, Wifi, CreditCard } from 'lucide-react';
import { cookies } from 'next/headers';
import RoutBack from './RoutBack';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SuspendUserButton from '@/components/admin/userManagement/SuspendUser';
import UnSuspendUserButton from '@/components/admin/userManagement/UnSuspendUser';
import ManipulateUserBalance from './ManipulateUserBalance';

type UserTransaction = {
  id: number;
  type: "credit" | "debit";
  date: string;
  amount: string;
  status: "completed" | "pending" | "failed" | "refunded";
};

type UserServices = {
  virtualNumbers: number;
  eSims: number;
  usdtTransactions: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isSuspended: boolean;
  registeredDate: Date;
  balance: number;
  transactions: UserTransaction[];
  services: UserServices;
};
type fetchResponse = {
  ok: boolean;
  msg?: string;
  user: User
}



const UserDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const token = (await cookies()).get('accessToken')?.value;
  const id = (await params).slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  const getTypeColor = (type: "credit" | "debit") => {
    switch (type) {
      case "credit":
        return " text-green-800";
      case "debit":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

  const getStatusColor = (status: "completed" | "pending" | "failed" | "refunded") => {
    switch (status) {
      case "completed":
        return "text-green-800";
      case "pending":
        return "text-yellow-800";
      case "failed":
        return "text-red-800";
      case "refunded":
        return " text-blue-800";
      default:
        return "text-gray-800";
    }
  };
  if (!res.ok) return redirect('/login')
  const data: fetchResponse = await res.json()
  const user = data.user
  return (
    <div className="">
      <div className="flex items-center mb-6">
        <RoutBack />
        <h1 className="text-2xl font-semibold text-gray-800">User Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6 text-gray-800">
        <h3 className="text-lg font-medium mb-4">User Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p className='capitalize'><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Registered:</strong> {new Date(user.registeredDate).toDateString()}</p>
          <p><strong>Balance:</strong> {user.balance}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <ServiceCard
            icon={<Phone className="h-8 w-8 text-teal-600 mr-3" />}
            count={user.services.virtualNumbers}
            label="Virtual Numbers"
            link={`/admin/users/${id}/sms`}
          />
          <ServiceCard
            icon={<Wifi className="h-8 w-8 text-teal-600 mr-3" />}
            count={user.services.eSims}
            label="eSIMs"
            link={`/admin/users/${id}/esims`}
          />
          <ServiceCard
            icon={<CreditCard className="h-8 w-8 text-teal-600 mr-3" />}
            count={user.services.usdtTransactions}
            label="USDT Transactions"
            link={`/admin/users/${id}/usdt-transactions`}
          />
        </div>
      </div>

      <div className="mt-8 text-sm">
        <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className={`px-4 py-2 ${getTypeColor(t.type)}`}>{t.type}</td>
                  <td className="px-4 py-2">{new Date(t.date).toLocaleTimeString()}</td>
                  <td className="px-4 py-2">{t.amount}</td>
                  <td className={`px-4 py-2 ${getStatusColor(t.status)}`}>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=' flex items-center justify-between my-2'>
          <Link href={`/admin/users/${id}/transactions`} className='text-teal-800 capitalize text-sm  block'>
            view all
          </Link>
        </div>
      </div>
      {user.isSuspended}
      <div className='mt-2 flex items-center gap-4 '>
      {user.isSuspended ? <UnSuspendUserButton userId={id}/> : <SuspendUserButton userId={id}/>}
        <ManipulateUserBalance amount={3264} email={user.email} />
      </div>
    </div>
  );
};

type ServiceCardProps = {
  icon: React.ReactNode;
  count: number;
  label: string;
  link: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, count, label, link }) => (
  <Link
    href={link}
    className="bg-gray-50 p-4 rounded flex items-center">
    {icon}
    <div>
      <p className="text-lg font-semibold">{count}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  </Link>
);

export default UserDetailPage;
