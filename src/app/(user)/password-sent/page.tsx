import { MoveLeft } from 'lucide-react'
import { cookies, headers } from 'next/headers';
import Link from 'next/link'
import React from 'react'
import { sentType } from '../verified/page';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const PasswordSent = async () => {
  const referer = (await headers()).get('referer');
  const token = (await cookies()).get('accessToken')?.value
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verification`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      cache: 'no-store',
    }
  });

  const data: sentType = await res.json();
  if (res.status === 401 || !data?.ok) {
    if (referer) {
      return redirect(referer)
    }
    return redirect('/')
  }
  return (
    <section className="p-4 h-screen text-center bg-zinc-100">
      <div className="max-w-xl mx-auto h-full flex items-center">
        <div className="w-full">
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={250}
            height={100}
            className="mx-auto bg-none md:hidden block"
          />
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={350}
            height={100}
            className="mx-auto bg-none hidden md:block"
          />
          <h1 className='font-semibold text-xl md:text-2xl text-gray-800 '>Kindly check your email</h1>
          <p className='mt-4 mb-6 font-[500] text-gray-600'>We have sent a password recovery instruction to your email.</p>
          <div className=''> <Link href='/login' className='mx-auto flex gap-2 justify-center items-center w-fit'><MoveLeft />Back to Signin</Link></div>
        </div>
      </div>
    </section>
  )
}

export default PasswordSent;