'use client';
import React, { useEffect, useState, useRef } from 'react';
import { UserIcon, SettingsIcon, UserStar, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { findUser } from '@/redux/type';
import { deleteToken, getToken } from '@/lib/Token';
import { useRouter } from 'next/navigation';
import { addUser } from '@/redux/slice/auth';
import Link from 'next/link';
import { logOutResponse } from '../dashboard/DashboardAside';
export const ProfileDropdown: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logOut = async () => {
      try {
        const res = await fetch('/api/logout')
        const data: logOutResponse = await res.json();
        if(!data.ok) return;
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        deleteToken();
        router.push('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = useAppSelector((state) => state.auth.user.user)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user?.firstName !== '' || user.lastName !== '') return;



    const fetchUser = async () => {
      try {
        const { data } = await axios.get<findUser>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )
        if (!data.ok) {
          router.push('/login');
        }
        if (data.ok) {
          dispatch(addUser(data))
          return;
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err)
      }
    }

    fetchUser()
  }, [])
  return <div className="relative" ref={dropdownRef}>
    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
      <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white">
        <UserIcon size={16} />
      </div>
      <div className="hidden md:block text-left">
        <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-slate-500">Member</p>
      </div>
      <ChevronDownIcon size={16} className="text-slate-500" />
    </button>
    {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 z-50">
      <div className="p-3 border-b border-slate-200 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-slate-500 capitalize">{user?.email}</p>
      </div>
      <div className="py-1">
        <Link href="#" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <UserIcon size={16} className="mr-2" />
          Profile
        </Link>
        {user?.role === 'admin' && (
          <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <UserStar size={16} className="mr-2" />
            Admin
          </Link>
        )}
        <Link href="/user/account" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <SettingsIcon size={16} className="mr-2" />
          Settings
        </Link>
      </div>
      <div className="py-1 border-t border-slate-200 dark:border-slate-800">
        <Link
        onClick={logOut}
         href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800">
          <LogOutIcon size={16} className="mr-2" />
          Logout
        </Link>
      </div>
    </div>}
  </div>;
};