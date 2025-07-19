'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const RoutBack = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className="mr-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
        </button>
    )
}
export default RoutBack