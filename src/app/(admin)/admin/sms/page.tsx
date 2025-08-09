'use client'
import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/Token';

type SMS = {
  number: string;
  name: string;
  cost: string;
  code: string;
  country: string;
  status: 'pending' | 'completed' | 'cancelled';
  updatedAt: string;
};

interface smsResponse {
  ok: boolean;
  msg?: string;
  activations?: SMS[];
  totalPages?: number;
  currentPage?: number;
}

const SmsPage = () => {
  const router = useRouter();
  const [sms, setSms] = useState<SMS[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSMS = async (pageNumber = 1, search = '') => {
    setLoading(true);
    const token = getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/getAllSms?page=${pageNumber}&limit=10&search=${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.status === 401) return router.push('/login');
    if (res.status === 403) return router.push('/account-suspended');


    const data: smsResponse = await res.json();

    if (!data.ok) {
      setSms([]);
    } else {
      setSms(data.activations || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSMS(page, searchTerm);
  }, [page, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="overflow-auto max-h-screen py-8 px-1">

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search SMS by number, name, code, country..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : sms.length === 0 ? (
        <div className="text-center p-4">No SMS found</div>
      ) : (
        <div className=' overflow-x-auto'>
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-teal-700">
              <tr>
                {['Country', 'Number', 'Cost', 'Code', 'Status', 'Date'].map((header) => (
                  <th key={header} className="px-4 py-3 whitespace-nowrap text-left font-semibold text-white uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sms.map((item, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-teal-50 transition`}>
                  <td className="px-4 py-3 text-gray-800 flex flex-col">
                    <p className="whitespace-nowrap">{item.country}</p>
                    <small className="text-[12px]">{item.name}</small>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">+{item.number}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">₦{item.cost}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{item.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{item.status}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{new Date(item.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      )}
    </div>
  );
};

export default SmsPage;
