import Link from 'next/link';
import React from 'react'

const Forgotpassword = () => {
    return (
        <section className="p-2 h-screen">
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3 capitalize">forgot password?</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <h3 className='text-gray-800 mb-4'>Enter your email address below</h3>
                    <form>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800">Email</label>
                            <input
                                required
                                name="email"
                                type="email" placeholder="Enter your Email" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>
                       
                        <div>
                            <button type="submit" disabled className=" capitalize bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-sm md:text-base text-white p-2 rounded-md">send recovery email</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Forgotpassword;