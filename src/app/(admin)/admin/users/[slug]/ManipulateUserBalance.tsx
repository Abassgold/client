'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { getToken } from '@/lib/Token';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

type Response = {
  ok: boolean;
  msg: string;
};

interface Props {
  email?: string;
  amount: number
}

const ManipulateUserBalance = ({ email}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    if (!email) {
      toast.error('No user email provided');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post<Response>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user-balance`,
        { type, amount, remarks, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.ok) {
        toast.error(data.msg);
        return;
      }

      toast.success(data.msg);
      router.refresh();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push('/login');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-3 my-1">
      <Toaster richColors duration={3000} position="top-center" />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-teal-700 hover:bg-teal-800 hover:text-gray-100 text-white">
            Credit/Debit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage User Wallet</DialogTitle>
            <DialogDescription>
              Credit or debit user balance with remarks.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded-md bg-zinc-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <div>
              <label htmlFor="amount" className="block mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount..."
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2 rounded-md bg-zinc-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="remarks" className="block mb-1">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                placeholder="Wallet debited/credited by FloZap for..."
                required
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className={`bg-teal-700 hover:bg-teal-800 text-white ${
                  loading && 'bg-teal-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManipulateUserBalance;
