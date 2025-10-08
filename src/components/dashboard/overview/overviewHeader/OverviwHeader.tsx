'use client'
import {  BellIcon, SearchIcon } from 'lucide-react';
import  { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { findUser } from '@/redux/type';
import { addUser } from '@/redux/slice/auth';
import { getToken } from '@/lib/Token';
import { NotificationPanel } from '@/components/layout/NotificationPanel';
import { ProfileDropdown } from '@/components/layout/ProfileDropdown';
import { MoonIcon, SunIcon } from 'lucide-react';
import { toggleDarkMode } from '@/redux/slice/darkMode';

const OverviwHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const pathName =usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(pathName);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const isDarkMode = useAppSelector((state) => state.darkMode);
  const DarkMode = () => {
    dispatch(toggleDarkMode());
  };
  const user = useAppSelector((state) => state.auth.user.user)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(user?.firstName !== '' || user.lastName !=='') return;
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
if(!data.ok) {
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

  return (
    <>
     <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4">
           <button
            className="md:hidden bg:text-slate-500 text-gray-800 mr-4 text-xl cursor-pointer"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <div className="ml-4 md:ml-6 relative hidden md:block">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1.5">
              <SearchIcon size={16} className="text-slate-500" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm text-slate-900 dark:text-white w-40 lg:w-64" />
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <button onClick={DarkMode} className="p-2 cursor-pointer rounded-full text-secondary-500 text-slate-500 hover:text-secondary-900 dark:hover:text-white">
          {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
            <div className="relative ml-2">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white relative">
                <BellIcon size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
            </div>
            <div className="ml-2">
              <ProfileDropdown />
            </div>
          </div>
          
        </header>
        <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        />
    </>
   
  )
}

export default OverviwHeader