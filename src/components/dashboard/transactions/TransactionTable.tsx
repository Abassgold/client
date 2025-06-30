'use client'

import { transactionType } from "./TransactionList"
import { useRouter } from "next/navigation"


export function TransactionTable({ transaction }: { transaction: transactionType }) {
    const router = useRouter()
    const goToUrl = (id: string) => {
        router.push(`/transactions/${id}`)
    }
    const color = transaction.status === 'failed' && 'bg-red-100 border-red-800 text-red-800' || transaction.status === 'pending' && 'bg-blue-100 border-blue-800 text-blue-800' || transaction.status === 'refunded' && 'bg-yellow-100 border-yellow-800 text-yellow-800' || transaction.status === 'completed' && 'bg-green-100 border-green-800 text-green-800'
    const statusClas = `border ${color} w-fit px-2 py-1 rounded-full`
    return (
        <tr
            onClick={() => goToUrl(transaction.transactionId)}
            className="border-b hover:bg-teal-100 cursor-pointer"
        >
            <td className="px-2 py-1 whitespace-nowrap">{transaction.transactionId}</td>
            <td className="px-2 py-1 whitespace-nowrap">
                 {new Date(transaction.updatedAt).toLocaleDateString()}
                </td>
            <td className="px-2 py-1 whitespace-nowrap">₦{transaction.amount.toLocaleString()}</td>
            <td className="px-2 py-1 whitespace-nowrap">₦{transaction.fee.toLocaleString()}</td>
            <td className="px-2 py-1 font-medium whitespace-nowrap">
                <p className={statusClas}>{transaction.status}</p>
            </td>
        </tr>

    )
}
