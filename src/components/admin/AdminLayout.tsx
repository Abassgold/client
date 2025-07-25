'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboardIcon,
  UsersIcon,
  TagIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ClipboardList,
  Landmark,
} from 'lucide-react';
import { logOutResponse } from '../dashboard/DashboardAside';
import { deleteToken } from '@/lib/Token';

export const AdminLayout = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboardIcon },
    { name: 'Finance', href: '/admin/finance', icon: Landmark },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Prices', href: '/admin/prices', icon: TagIcon },
    { name: 'Transactions', href: '/admin/transactions', icon: ClipboardList },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) =>
    path === '/admin'
      ? pathName === '/admin'
      : pathName.startsWith(path) && path !== '/admin';

  return (
    <div className="md:min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Top Navbar */}
      <div className="flex md:hidden items-center justify-between bg-teal-800 text-white px-4 py-3">
        <span className="text-xl font-bold">FloZap Admin</span>
        <button onClick={() => setSidebarOpen(true)}>
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col max-w-xs w-full bg-teal-800 z-50">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-white text-xl font-bold">FloZap Admin</span>
              <button onClick={() => setSidebarOpen(false)}>
                <XIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-teal-900 text-white'
                      : 'text-teal-100 hover:bg-teal-700'
                  }`}
                >
                  <item.icon className="mr-4 h-6 w-6 text-teal-200" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-teal-700 p-4">
              <button
                onClick={logOut}
                className="w-full flex items-center group cursor-pointer"
              >
                <LogOutIcon className="mr-2  h-5 w-5 text-white group-hover:text-teal-200" />
                <span className="text-base font-medium text-white group-hover:text-teal-200">
                  Log out
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-teal-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <span className="text-white text-xl font-bold">FloZap Admin</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-teal-900 text-white'
                      : 'text-teal-100 hover:bg-teal-700'
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6 text-teal-200" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-teal-700 p-4">
            <button
              onClick={logOut}
              className="w-full flex items-center group cursor-pointer"
            >
              <LogOutIcon className="mr-2  h-5 w-5 text-white group-hover:text-teal-200" />
              <span className="text-sm font-medium text-white group-hover:text-teal-200">
                Log out
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
