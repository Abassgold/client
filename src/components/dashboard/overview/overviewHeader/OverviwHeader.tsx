'use client'
import { Bell } from 'lucide-react';
import  { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { dasbhboardNavitems } from '../../DashboardAside';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import { findUser } from '@/redux/type';
import { addUser } from '@/redux/slice/auth';
import { getToken } from '@/lib/Token';

const OverviwHeader = () => {
  const pathName =usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(pathName);
    const path = dasbhboardNavitems.find((item)=> item.url.startsWith(pathName))
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const user = useAppSelector((state) => state.auth.user.user)
  const initials = `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`.toUpperCase(); 
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
}, [router, dispatch, user])

  return (
    <section>
      <nav className="flex justify-between items-center bg-white border-b-2 text-gray-800 px-2 py-4">
        <div className="flex items-center">
          <button
            className="md:hidden text-gray-800 mr-4 text-xl cursor-pointer"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">{path?.title}</h1>
        </div>
        <div className="flex gap-4 justify-end items-center">
          <Bell fill="white" className="cursor-pointer" />
          <span className="hidden sm:block capitalize">Welcome, {user?.firstName} {user?.lastName}</span>
          <div className=" cursor-pointer me-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {initials || 'NA'}
          </div>
        </div>
      </nav>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </section>
  )
}

export default OverviwHeader