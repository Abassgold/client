import React, { useEffect, useState, useRef } from 'react';
import { UserIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
export const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  return <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
        <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white">
          <UserIcon size={16} />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-secondary-900 dark:text-white">
            John Doe
          </p>
          <p className="text-xs text-secondary-500">Administrator</p>
        </div>
        <ChevronDownIcon size={16} className="text-secondary-500" />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-900 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-800 z-50">
          <div className="p-3 border-b border-secondary-200 dark:border-secondary-800">
            <p className="text-sm font-medium text-secondary-900 dark:text-white">
              John Doe
            </p>
            <p className="text-xs text-secondary-500">john.doe@example.com</p>
          </div>
          <div className="py-1">
            <a href="#" className="flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
              <UserIcon size={16} className="mr-2" />
              Profile
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
              <SettingsIcon size={16} className="mr-2" />
              Settings
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800">
              <HelpCircleIcon size={16} className="mr-2" />
              Help
            </a>
          </div>
          <div className="py-1 border-t border-secondary-200 dark:border-secondary-800">
            <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-secondary-100 dark:hover:bg-secondary-800">
              <LogOutIcon size={16} className="mr-2" />
              Logout
            </a>
          </div>
        </div>}
    </div>;
};