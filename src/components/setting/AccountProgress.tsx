import React from 'react'
import Link from 'next/link';

const AccountProgress = ({tier}:{tier: number}) => {
    return (
       <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10
    border border-blue-200 dark:border-blue-800 
    rounded-xl p-5 space-y-4 mt-4">

    <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
            Account Progress
        </h1>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-600 text-white">
            Tier {tier} / 3
        </span>
    </div>

<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
  You&apos;re currently on <span className="font-medium text-blue-700 dark:text-blue-300">Tier {tier}</span>.
  Upgrade to Tier {tier + 2} to increase your wallet limit and unlock more features.
</p>


    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
        <div className="h-2 bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${tier*33.3}%` }}></div>
    </div>

    <p className="text-xs text-blue-600 dark:text-blue-300 font-medium text-right">
        {tier*(33.3)}% Completed
    </p>
        <Link
        href="/user/kyc"
        className="block text-center mt-3 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all"
    >
        Upgrade Now
    </Link>
</div>

    )
}

export default AccountProgress;