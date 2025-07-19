import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { isAuthenticated } from '@/middlewares/api/authMiddleware';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

const AccountSuspendedPage = async () => {
  const token = (await cookies()).get('accessToken')?.value ?? ''
  const referer = (await headers()).get('referer');
  const authStatus = await isAuthenticated(token);
  if (!authStatus.authenticated) return redirect('/login')
  if (!authStatus.suspended) {
    if (referer) {
      return redirect(referer)
    }
    return redirect('/')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Account Suspended
        </h1>
        <p className="text-gray-600 mb-4">
          Your account has been temporarily suspended due to violation of our rules and policies.
        </p>
        <p className="text-gray-600 mb-6">
          Please contact support if you believe this was a mistake or to resolve this issue.
        </p>
        <Link
          href=''
          className="bg-teal-600 text-white cursor-pointer px-4 py-3 rounded-lg hover:bg-teal-700 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default AccountSuspendedPage;
