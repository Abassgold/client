'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui copy/Card'

const Deposit = () => {
    const router = useRouter()

    const handleSelect = (method: 'usa' | 'others') => {
        router.push(`/user/virtual-numb/${method}`)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Choose Number Region
                </h1>
            </div>

            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl sm:text-2xl">
                        Select Where You Want Your Number From
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 sm:p-10">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* USA Option */}
                        <div
                            onClick={() => handleSelect('usa')}
                            className="relative w-full border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-teal-500 dark:hover:border-teal-600 transition cursor-pointer bg-white dark:bg-slate-800 text-center overflow-hidden"
                        >
                            {/* USA flag background */}


                            <div className="relative z-10">
                                <div className='flex justify-center items-center gap-2'>
                                    <img src="/usaflag.png" alt="" className=' h-4 w-6'/>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        USA Only
                                    </h2>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Select this if you want to buy or use only U.S.-based numbers.
                                </p>
                            </div>
                        </div>

                        {/* Others Option */}
                        <div
                            onClick={() => handleSelect('others')}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-teal-500 dark:hover:border-teal-600 transition cursor-pointer bg-white dark:bg-slate-800 text-center"
                        >
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                🌍 Others
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Choose this if you want numbers from other countries outside the U.S.
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
                        Click <span className="font-medium text-teal-600">“USA Only”</span> if you want
                        to purchase or use <span className="font-semibold">United States numbers</span> only.
                        Choose <span className="font-medium text-teal-600">“Others”</span> for
                        <span className="font-semibold"> international numbers</span> from other countries.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-8 max-w-2xl mx-auto">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Why Choose a Number Region?
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                                    <span className="text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                                        Access Region-Specific Platforms
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Some apps or websites accept only certain country numbers. Choosing the right region ensures smooth verification.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                                    <span className="text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                                        Better Pricing & Availability
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Pricing and available numbers differ per region — this helps you find what’s affordable and accessible.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                                    <span className="text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                                        Global Flexibility
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Whether you need a U.S. number or one from another country, you can easily select based on your needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Deposit
