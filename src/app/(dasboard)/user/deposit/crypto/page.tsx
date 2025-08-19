// 'use client'
// import { getToken } from '@/lib/Token';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// type priceResponse = {
//     ok: boolean;
//     usdToNaira: number;
//     msg?: string;
// }
const Page = () => {
    // const router = useRouter();
    // const token = getToken();
    // const [usdToNaira, setUsdToNaira] = useState<number | undefined>(undefined);
    // const [number, setNumber] = useState<number | undefined>()
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState<string>('')
    // const fetchPrice = async () => {
    //     const { data } = await axios.get<priceResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/getPrice`)
    //     if (data.ok) {
    //         setUsdToNaira(data.usdToNaira)
    //     }
    //     else {
    //         setError(data.msg || 'An error occurred while fetching the price. Please try again.');
    //     }
    //     return data;
    // }


    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     if (!number || number < 5) {
    //         setError('Minimum deposit amount is $5.00')
    //         return
    //     }

    //     setError('')
    //     setLoading(true)
    //     try {
    //         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/crypto/generate-invoice?amount=${number}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         if (data.ok) {
    //             window.location.href = data.data.invoice_url;
    //         } else {
    //             setError(data.msg || 'An error occurred while processing your payment. Please try again.');
    //         }
    //     } catch (error) {
    //         setError('An error occurred while processing your payment. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // const quickSelect = (amount: number) => {
    //     setNumber(amount)
    //     setError('')
    // }
    // useEffect(() => {
    //     fetchPrice()
    // }, [])
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
                        $1.00
                    </p>
                    <p className='text-gray-800 text-sm font-normal my-1'>
                        Amount in Naira is:
                        <span className='font-bold text-teal-800'> ₦{(number && usdToNaira ? number * usdToNaira : 0).toLocaleString()}</span>
                    </p>
                    <div className='flex flex-wrap gap-2 mt-4 mb-6'>
                        {[5, 10, 20, 40, 80, 100].map((amt) => (
                            <div
                                key={amt}
                                onClick={() => quickSelect(amt)}
                                className='p-3 w-fit rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 text-sm cursor-pointer'
                            >
                                ${amt.toLocaleString()}
                            </div>
                        ))}
                    </div>

                    <div className='text-sm'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-1 relative text-sm'>
                                <input
                                    required
                                    type='number'
                                    value={number || ''}
                                    onChange={(e) => setNumber(parseInt(e.target.value))}
                                    placeholder='1000'
                                    className='py-[10px] pl-6 w-full border-[1px] focus:border-teal-600 rounded-lg outline-none'
                                />
                                <p className='absolute left-2 top-[11px] text-gray-500'>$</p>
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
