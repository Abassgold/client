'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/Token';
// import ManipulateUserBalance from '../../users/[slug]/ManipulateUserBalance';

type Transaction = {
    _id: string;
    userId: string;
    sender: string;
    transactionId: string;
    beneficiary: string;
    email: string;
    phone: string;
    serviceType: string;
    amount: number;
    fee: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    type: 'credit' | 'debit';
    remarks?: string;
    reference: string;
    details: Record<string, null>;
    createdAt: string;
};
interface fetchResponse {
    ok: boolean;
    transaction: Transaction
}
interface Props {
    params: Promise<{ slug: string }>;
}

const TransactionDetailPage = ({ params }: Props) => {
    const router = useRouter();
    const [tx, setTx] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchDetails = async () => {
        try {
            const token = getToken();
            const { slug } = await params;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/transactions/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            if (res.status === 401) {
                router.push('/login');
                return;
            }
            if (res.status === 404) {
                router.push('/404');
                return;
            }

            const data: fetchResponse = await res.json();
            setTx(data.transaction);
        } catch (error) {
            console.error(error);
            setErrorMsg('Failed to fetch transaction details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (errorMsg) {
        return <div className="text-center text-red-600 py-10">{errorMsg}</div>;
    }

    if (!tx) {
        return <div className="text-center py-10">No transaction found.</div>;
    }

    return (
        <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg border p-6">
            <h1 className="text-xl font-bold text-center mb-4">Transaction Receipt</h1>

            <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Transaction Ref:</span> {tx.reference}</p>
                <p><span className="font-semibold">Sender:</span> {tx.sender}</p>
                <p className='capitalize'><span className="font-semibold">Beneficiary:</span> {tx.beneficiary}</p>
                <p><span className="font-semibold">Email:</span> {tx.email}</p>
                <p><span className="font-semibold">Phone:</span> {tx.phone}</p>
                <p><span className="font-semibold">Service Type:</span> {tx.serviceType}</p>
                <p><span className="font-semibold">Type:</span> {tx.type}</p>
                <p><span className="font-semibold">Amount:</span> ₦{tx.amount}</p>
                <p><span className="font-semibold">Fee:</span> ₦{tx.fee}</p>
                <p>
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                        className={
                            tx.status === 'completed'
                                ? 'text-green-600 font-medium'
                                : tx.status === 'pending'
                                    ? 'text-yellow-600 font-medium'
                                    : tx.status === 'refunded'
                                        ? 'text-blue-600 font-medium'
                                        : 'text-red-600 font-medium'
                        }
                    >
                        {tx.status}
                    </span>
                </p>
                <p><span className="font-semibold">Remarks:</span> {tx.remarks || '-'}</p>
                <p><span className="font-semibold">Date:</span> {new Date(tx.createdAt).toLocaleString()}</p>

                <div>
                    <p className="font-semibold mb-2">Details:</p>
                    {tx.details && Object.keys(tx.details).length > 0 && (
                        <div className="bg-gray-50 p-3 rounded border space-y-1 text-sm">
                            {Object.entries(tx.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b py-1 last:border-b-0">
                                    <span className="font-medium capitalize">{key}</span>
                                    <span>{String(value)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => window.print()}
                    className="px-2 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                >
                    Print Receipt
                </button>
            </div>
        </div>
    );
};

export default TransactionDetailPage;
