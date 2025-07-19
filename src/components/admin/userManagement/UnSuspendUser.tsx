'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/Token';
import { Toaster } from '@/components/ui/sonner';

interface SuspendUserButtonProps {
  userId: string;
}
type responseType = {
  ok: boolean;
  msg: string;
}
const UnSuspendUserButton: React.FC<SuspendUserButtonProps> = ({ userId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  const handleSuspend = async () => {
    const token = getToken()
    if (!reason.trim()) {
      toast.warning('Please provide a reason for suspension');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.patch<responseType>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${userId}/unsuspend`, { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!data.ok) return toast.error(data.msg)
      toast.success('User un-suspended successfully');
      router.refresh()
    } catch (error: unknown) {
      const err = error as AxiosError
      if (err.response?.status === 401) return router.push('/login')
      if (err.response?.status === 403) return router.push('/account-suspended')
      toast.error('Failed to suspend user');
    } finally {
      setLoading(false);
      setReason('');
    }
  };

  return (
    <Dialog>
      <Toaster
        richColors
        duration={2000}
        position='top-center'
      />
      <DialogTrigger asChild>
        <Button className='bg-teal-700 cursor-pointer hover:bg-teal-800' variant="destructive" disabled={loading}>
          Un-Suspend User
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Un-Suspend User</DialogTitle>
        </DialogHeader>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for un-suspension
          </label>
          <Input
            id="reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
          />
        </div>

        <DialogFooter>
          <Button
            className='bg-teal-800 cursor-pointer'
            onClick={handleSuspend} disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Un-Suspend'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

export default UnSuspendUserButton;
