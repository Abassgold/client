'use client';
import React from 'react';
import { 
  // MenuIcon, 
  // BellIcon, 
  // SunIcon,
  //  MoonIcon, 
   SearchIcon 
  } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
// import { NotificationPanel } from './NotificationPanel';

export const Header: React.FC = () => {
  // const [showNotifications, setShowNotifications] = useState(false);
  return <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4">
      
      <div className="ml-4 md:ml-6 relative hidden md:block">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-1.5">
          <SearchIcon size={16} className="text-slate-500" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm text-slate-900 dark:text-white w-40 lg:w-64" />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        {/* <div className="relative ml-2">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white relative">
            <BellIcon size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        </div> */}
        <div className="ml-2">
          <ProfileDropdown />
        </div>
      </div>
    </header>;
};