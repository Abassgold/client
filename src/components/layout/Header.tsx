import React, { useState } from 'react';
import { MenuIcon, BellIcon, SunIcon, MoonIcon, SearchIcon } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { NotificationPanel } from './NotificationPanel';
interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}
export const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  sidebarCollapsed,
  toggleDarkMode,
  isDarkMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  return <header className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 h-16 flex items-center px-4">
      <button onClick={toggleSidebar} className="p-2 rounded-md text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
        <MenuIcon size={20} />
      </button>
      <div className="ml-4 md:ml-6 relative hidden md:block">
        <div className="flex items-center bg-secondary-100 dark:bg-secondary-800 rounded-md px-3 py-1.5">
          <SearchIcon size={16} className="text-secondary-500" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-2 text-sm text-secondary-900 dark:text-white w-40 lg:w-64" />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <button onClick={toggleDarkMode} className="p-2 rounded-full text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
          {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
        <div className="relative ml-2">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full text-secondary-500 hover:text-secondary-900 dark:hover:text-white relative">
            <BellIcon size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        </div>
        <div className="ml-2">
          <ProfileDropdown />
        </div>
      </div>
    </header>;
};