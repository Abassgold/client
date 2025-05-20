import { MoveLeft } from "lucide-react"
import Link from "next/link"

const PasswordReset = () => {
    return (
        <section className="p-4 h-screen">
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3 capitalize">reset password!</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <h3 className='text-gray-800 mb-4'>Your new password must be different from the previous ones</h3>
                    <form className="mb-6">
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800 font-semibold">Password</label>
                            <input
                                required
                                name="newPassword"
                                type="password" placeholder="Your new password" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800 font-semibold">Confirm password</label>
                            <input
                                required
                                name="confirmNewPassword"
                                type="password" placeholder="Confirm your new password" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>
                        <div>
                            <button type="submit" disabled className=" capitalize bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-sm md:text-base text-white p-2 rounded-md">send recovery email</button>
                        </div>
                    </form>
                    <div className='flex gap-2 justify-center items-center'><MoveLeft /> <Link href='/login' className='block'>Back to Signin</Link></div>
                </div>
            </div>
        </section>
    )
}

export default PasswordReset