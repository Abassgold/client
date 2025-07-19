'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
import { useParams, useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ManipulateUserBalance from '../ManipulateUserBalance';

type SMS = {
    _id: string;
    number: string;
    name: string;
    cost: number;
    code?: string;
    country: string;
    status: 'pending' | 'completed' | 'cancelled' | 'refunded';
    updatedAt: string;
    balAF: number;
    balB4: number;
};

interface User {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}

interface smsResponse {
    ok: boolean;
    msg?: string;
    activations?: SMS[];
    user: User;
    totalPages?: number;
    currentPage?: number;
}

const SMSPage = () => {
    const params = useParams<{slug: string}>()
    const userId = params.slug
    const router = useRouter();
    const [smsData, setSmsData] = useState<SMS[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');

    const fetchUserSMS = async () => {
        setLoading(true);
        const token = getToken();

        try {
            const { data } = await axios.get<smsResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/user/${userId}/sms`,
                {
                    params: { page, limit: 10, status: statusFilter },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!data.ok) {
                toast.error(data.msg || 'No SMS found');
                setSmsData([]);
            } else {
                setSmsData(data.activations || []);
                setUser(data.user);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 400 || err.response?.status === 401) {
                router.push('/login');
            } else {
                toast.error('Failed to fetch SMS data');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserSMS();
    }, [page, statusFilter]);

    return (
        <div className="mx-auto  py-6">
            <Toaster richColors position="top-center" duration={2000} />
            {user && (
                <div className="bg-teal-700 text-white rounded-lg p-6 shadow-md mb-8">
                    <h1 className="text-xl md:text-2xl font-bold mb-2 capitalize">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-sm mb-1">Email: {user.email}</p>
                    <p className="text-sm">Phone: {user.telephone}</p>
                </div>
            )}



            {loading ? (
                <div className="text-center py-6">Loading...</div>
            ) : smsData.length === 0 ? (
                <div className="text-center py-6 text-gray-700">This user has not bought SMS yet.</div>
            ) : (
                <section>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <label htmlFor="status" className="text-sm font-medium text-gray-700">
                            Filter by Status:
                        </label>
                        <select
                            id="status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-2 border border-gray-300 bg-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>
                    <div className="overflow-auto max-h-[35rem] text-sm">
                        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                            <thead className="bg-teal-800">
                                <tr>
                                    {['ID','Country', 'Number', 'Code', 'Price', 'Status', 'balB4', 'balAF', 'Date', 'Action'].map((header) => (
                                        <th key={header} className="px-4 py-3 text-left text-white uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {smsData.map((tx, index) => (
                                    <tr
                                        key={tx._id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-50 transition`}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap">+{tx._id}</td>

                                        <td className="px-4">
                                            <p className="whitespace-nowrap">{tx.country}</p>
                                            <small className="text-[12px] whitespace-nowrap">{tx.name}</small>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">+{tx.number}</td>
                                        <td className="px-4 py-2  whitespace-nowrap">{tx.code || '-'}</td>
                                        <td className="px-4 py-2  whitespace-nowrap">₦{tx.cost}</td>
                                        <td
                                            className={`px-4 py-1 whitespace-nowrap font-medium ${tx.status === 'completed'
                                                    ? 'text-green-600'
                                                    : tx.status === 'pending'
                                                        ? 'text-yellow-600'
                                                        : tx.status === 'refunded'
                                                            ? 'text-blue-600'
                                                            : 'text-red-600'
                                                }`}
                                        >
                                            {tx.status}
                                        </td>
                                        <td className="px-4 py-2  whitespace-nowrap">₦{tx.balB4}</td>
                                        <td className="px-4 py-2  whitespace-nowrap">₦{tx.balAF}</td>
                                        <td className="px-4 py-2  whitespace-nowrap">{new Date(tx.updatedAt).toLocaleString()}</td>
                                        <td className="px-4  whitespace-nowrap">
                                            <div className="inline-flex justify-center items-center ">
                                                {(tx.status === 'pending' || tx.status === 'cancelled') && (
                                                    <ManipulateUserBalance email={user?.email || ''} amount={tx.cost}/>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="w-full flex justify-start mt-4">
                            <Pagination className="text-teal-800">
                                <PaginationContent>
                                    <PaginationItem>
                                        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                                            <PaginationPrevious href="#" />
                                        </button>
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <button onClick={() => setPage(i + 1)}>
                                                <PaginationLink href="#" isActive={page === i + 1}>
                                                    {i + 1}
                                                </PaginationLink>
                                            </button>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                                            <PaginationNext href="#" />
                                        </button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default SMSPage;
