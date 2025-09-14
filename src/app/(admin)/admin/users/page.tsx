'use client'
import React, { useEffect, useState } from 'react'
import { SearchIcon, EyeIcon, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Users } from '../adminTypes'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/Token'
import { toast } from 'react-toastify'
import PaginationWrapper from '@/components/pagination/PaginationWrapper'

interface fetchUsersResponse {
  ok: true
  msg?: string
  users: Users[]
  totalPages: number
  currentPage: number
}

const Page = () => {
  const router = useRouter()
  const [users, setUsers] = useState<Users[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchUsers = async (pageNumber = 1, search = '') => {
    try {
      const { data } = await axios.get<fetchUsersResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          params: { page: pageNumber, limit: 10, search },
        }
      )
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
    <div className="relative">
      <div className="sticky top-0 bg-white z-10">
        <div className="sm:flex sm:items-center p-2">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in your FloZap platform including their name,
              email, telephone, registration date and verification status.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-4 flex flex-col p-2">
          <div className="-mb-2 flex flex-wrap">
            <div className="mb-2 mr-4 flex-1">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
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

        {/* Users Table */}
        <div className="mt-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telephone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {user.firstName + ' ' + user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.telephone || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.isVerified ? (
                            <span className="flex items-center text-green-600 font-medium">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500 font-medium">
                              <XCircle className="h-4 w-4 mr-1" />
                              Not Verified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/users/${user._id}`}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-4 text-gray-500 text-sm"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-start mt-4">
          <PaginationWrapper
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
