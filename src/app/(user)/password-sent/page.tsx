import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Passwordsent = () => {
  return (
<section className="p-2 h-screen text-center">
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <h1 className='font-semibold text-xl md:text-2xl text-gray-800 '>Kindly check your email</h1>
                    <p className='mt-4 mb-6 font-[500] text-gray-600'>We have sent a password recovery instruction to your email</p>
                    <div className='flex gap-2 justify-center items-center'><MoveLeft /> <Link href='/signin' className='block'>Back to Signin</Link></div>
                </div>
            </div>
        </section>
  )
}

export default Passwordsent;