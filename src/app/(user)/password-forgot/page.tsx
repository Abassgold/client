'use client'
import axios from 'axios';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Forgotpassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/password-reset`, { email });
            if (res.data.ok) {
                alert(res.data.msg);
                router.push('/login');
            } else {
                alert(res.data.msg || "An error occurred");
            }
        } catch (err) {
            console.error(err);
            alert('Failed to send recovery email');
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className="p-4 h-screen bg-zinc-100">
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
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3 capitalize">forgot password?</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <h3 className='text-gray-800 mb-4'>Enter your email address below</h3>
                    <form onSubmit={sendEmail} className='flex flex-col gap-2'>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                name="email"
                                type="email" placeholder="Enter your Email" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>

                        <div className='mb-4'>
                            <button
                                type="submit"
                                disabled={loading}
                                className=" capitalize bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-sm md:text-base text-white p-2 rounded-md">
                                {loading ? 'wait...' : 'send recovery email'}
                            </button>
                        </div>
                    </form>
                    <div className=''> <Link href='/login' className='mx-auto flex gap-2 justify-center items-center w-fit'><MoveLeft />Back to Signin</Link></div>
                </div>
            </div>
        </section>
    )
}

export default Forgotpassword;