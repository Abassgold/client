'use client';
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import React, { useState } from 'react'

const CopyWallet = ({ currentAddress }: { currentAddress: string }) => {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(currentAddress)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    return (
        <button
            onClick={handleCopy}
            className="flex items-center justify-center px-3 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
            {copied ? (
                <CheckIcon size={18} className="text-green-600" />
            ) : (
                <ClipboardIcon
                    size={18}
                    className="text-slate-600 dark:text-slate-400"
                />
            )}
        </button>
    )
}

export default CopyWallet