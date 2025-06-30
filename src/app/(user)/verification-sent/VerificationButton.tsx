"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface sentType {
  ok: boolean;
  msg?: string;
  user?: string;
}
const VerificationButton = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const sendVerificationMail = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1];
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verification`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          cache: 'no-store',
        }
      });
      const data: sentType = await res.json();
      if (res.status === 401 || !data?.ok) {
        return router.back()
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error('Error fetching token:', error.message);
      return;
      console.error('Unknown Error: ', error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      type='button'
      disabled={loading}
      onClick={sendVerificationMail}
      className='cursor-pointer text-gray-100 bg-teal-400 px-2 py-1 rounded-md font-medium'>
      {loading ? 'sending...' : children}
    </button>
  )
}

export default VerificationButton