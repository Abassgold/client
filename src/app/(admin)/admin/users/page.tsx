'use client'
import React, { useEffect, useState } from 'react'
import { SearchIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { Users } from '../adminTypes'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getToken } from '@/lib/Token'

interface fetchUsersResponse {
  ok: true;
  msg?: string;
  users: Users[];
  totalPages: number;
  currentPage: number;
}

const Page = () => {
  const router = useRouter()
  const [users, setUsers] = useState<Users[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchUsers = async (pageNumber = 1, search = '') => {
    try {
      const { data } = await axios.get<fetchUsersResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: { page: pageNumber, limit: 10, search }
      })
      if (!data.ok) {
        setUsers([])
        setTotalPages(1)
        return
      }
      setUsers(data.users)
      setTotalPages(data.totalPages)
      setPage(data.currentPage)
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) return router.push('/login')
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    fetchUsers(page, searchTerm)
  }, [page, searchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  return (
    <div className='relative'>
      <Toaster richColors position='top-center' duration={2000} />

      <div className='sticky  top-0'>
        <div className="sm:flex sm:items-center p-2">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in your FloZap platform including their name,
              email, status and activity.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col p-2">
          <div className="-mb-2 flex flex-wrap">
            <div className="mb-2 mr-4 flex-1">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-teal-500 focus:border-teal-500 block p-2 w-full border-[1px] pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Date</th>
                    <th className="relative px-6 py-3"><span className="sr-only">View</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 capitalize">{user.firstName + ' ' + user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.telephone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/users/${user._id}`} className="text-teal-600 hover:text-teal-900">
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="text-center p-4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start mt-4">
          <Pagination className='text-teal-800'>
            <PaginationContent>
              <PaginationItem>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                  <PaginationPrevious href="#" />
                </button>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <button onClick={() => setPage(i + 1)}>
                    <PaginationLink href="#" isActive={page === i + 1}>{i + 1}</PaginationLink>
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
    </div>
  )
}

export default Page
