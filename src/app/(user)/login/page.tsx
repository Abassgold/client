import Link from "next/link";

const Login = () => {
    return (
        <section className="p-4 h-screen">
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3">welcome back!</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <form>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800">Email</label>
                            <input
                                required
                                name="email"
                                type="email" placeholder="Enter your Email" className="block text-sm md:text-base font-normal text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <label htmlFor="" className="mb-1 block text-gray-800">Password</label>
                                <Link
                                    className="block text-red-600"
                                    href=''>
                                    <small>
                                        Forgot password?
                                    </small>
                                </Link>
                            </div>
                            <input
                                required
                                name="email"
                                type="password" placeholder="Enter your Password" className="block text-sm md:text-base font-normal text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                        </div>
                        <div>
                            <button type="submit" disabled className="bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-white p-2 rounded-md">Sign In</button>
                        </div>
                    </form>
                    <div className="py-4 text-center text-[14px] text-gray-600">
                        New to FloZap? <Link href='/register' className="text-red-600">Sign up </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;