'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser } from '@/redux/slice/auth';
import { findUser } from '@/redux/type';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getToken } from '@/lib/Token';
import { toast } from 'sonner';
interface paymentType {
  ok: boolean;
  msg: string;
}
const DepositPage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useAppSelector((state) => state.auth.user.user);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || amount < 1000) {
      setError('Minimum deposit amount is ₦1,000');
      return;
    }

    setError('');
    setLoading(true);


    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/initialize-payment`, { amount }, {
        headers:{
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (res.status === 500) {
        setError('An error occurred while processing your payment. Please try again.');
        return;
      }
      if (res.status === 401) {
        return redirect('/login')
      } if (res.status === 403) {
        return redirect('/account-suspended')
      }

      const { default: PayStackPop } = await import('@paystack/inline-js');

      const popup = new PayStackPop();
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
        email: user?.email || '',
        amount: amount * 100,
        reference: res.data.data.reference,
        onSuccess: async (transaction) => {
          const verifyPayment = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: transaction.reference, email: user?.email }),
          });

          const verifyData: paymentType = await verifyPayment.json();
          if (verifyData.ok) {
            toast.success('Wallet funded successfully!');
            router.push('/dashboard');
          } else {
            toast.error(verifyData.msg || 'Payment verification failed. Please try again.');
          }
        },
        onCancel: () => {
          setLoading(false);
          toast.error('Payment cancelled. Please try again.');
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error during payment:', error.message);
        setError('An error occurred while processing your payment. Please try again.');
        return;
      }
      console.error('Unknown error: ', error);
      setError('Unknown error');
    } finally {
      setLoading(false);
    }
  };





  const quickSelect = (amt: number) => {
    setAmount(amt);
    setError('');
  };
  useEffect(() => {

    if (!user || user.email === '') return;
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`
          }
        }
        );
        if (response.status === 401) {
          router.push('/login');
        }
        const data: findUser = await response.json();
        dispatch(addUser(data))
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching user:', err.message);
          return;
        }
        console.error('Unknown error: ', err)
      }
    }
    fetchUser();
  }, [])

  return (
    <section className="mx-auto max-w-3xl p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        Deposit with Paystack
      </h1>
      <p className="mb-1">Enter the amount you want to deposit</p>
      <p className="text-teal-800 font-bold text-sm">
        Minimum: ₦1,000.00
      </p>

      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        {[1000, 2000, 5000, 10000, 20000].map((amt) => (
          <div
            key={amt}
            onClick={() => quickSelect(amt)}
            className="p-3 w-fit rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer"
          >
            ₦{amt.toLocaleString()}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-2 relative">
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            placeholder="1000"
            className="py-[10px] pl-6 w-full border focus:border-teal-600 rounded-lg outline-none"
          />
          <span className="absolute left-2 top-[11px] text-gray-500">₦</span>
        </div>

        {error && <p className="text-red-600 mb-2 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-900 hover:bg-teal-800 text-white w-full py-3 px-3 cursor-pointer rounded-lg disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Fund Wallet'}
        </button>
      </form>
    </section>
  );
};

export default DepositPage;
