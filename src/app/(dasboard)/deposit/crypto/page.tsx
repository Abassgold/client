// 'use client'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
    const token = (await cookies()).get('accessToken')?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/zixipay/generate-wallet`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                cache: 'no-store',
            }
        }
    )
    if (res.status === 401) redirect('/login')
        







    // const [number, setNumber] = useState<number | undefined>()
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState<string>('')

    // const submitForm = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     if (!number || number < 1750) {
    //         setError('Minimum deposit amount is ₦1,000')
    //         return
    //     }

    //     setError('')
    //     setLoading(true)

    //     // TODO: call PayStack here

    //     setLoading(false)
    // }

    // const quickSelect = (amount: number) => {
    //     setNumber(amount)
    //     setError('')
    // }

    return (
        <>
            <section>
                <h1 className=' text-center py-5'>The payment feature is coming soon...</h1>
            </section>
            {/* <section className='mx-auto max-w-3xl p-4 bg-white rounded-lg shadow-md mt-10'>
                <div>
                    <h1 className='text-xl font-bold text-gray-700 mb-4'>
                        Deposit with Crypto Gateway
                    </h1>
                    <p className='mb-1'>Enter the amount you want to deposit.</p>
                    <p className='text-teal-800 font-bold'>
                        Note:
                        <span className='text-gray-800 text-sm font-normal'>
                            {' '}
                            Minimum deposit amount is{' '}
                        </span>
                        NGN1,750.00
                    </p>

                    <div className='flex flex-wrap gap-2 mt-4 mb-6'>
                        {[1000, 2000, 5000, 10000, 15000, 20000, 30000].map((amt) => (
                            <div
                                key={amt}
                                onClick={() => quickSelect(amt)}
                                className='p-3 w-fit rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer'
                            >
                                ₦{amt.toLocaleString()}
                            </div>
                        ))}
                    </div>

                    <div className='text-sm'>
                        <form onSubmit={submitForm}>
                            <div className='mb-1 relative text-sm'>
                                <input
                                    type='number'
                                    value={number || ''}
                                    onChange={(e) => setNumber(parseInt(e.target.value))}
                                    placeholder='1000'
                                    className='py-[10px] pl-6 w-full border-[1px] focus:border-teal-600 rounded-lg outline-none'
                                />
                                <p className='absolute left-2 top-[11px] text-gray-500'>₦</p>
                            </div>
                            {error && (
                                <p className='text-red-600 mb-4 text-xs'>{error}</p>
                            )}
                            <div>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='bg-teal-900 hover:bg-teal-800 text-white w-full py-3 px-3 cursor-pointer rounded-lg disabled:opacity-50'
                                >
                                    {
                                     loading ? 'Processing...' : 'Fund Wallet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Page;
