import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
interface NotificationPanelProps {
  onClose: () => void;
}
export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  onClose
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const notifications = [{
    id: 1,
    title: 'Transaction Successful',
    message: 'Your airtime recharge of ₦2,000 was successful.',
    time: '2 min ago',
    read: false,
    type: 'success'
  }, {
    id: 2,
    title: 'Payment Received',
    message: 'You received ₦5,000 from airtime conversion.',
    time: '1 hour ago',
    read: false,
    type: 'info'
  }, {
    id: 3,
    title: 'New Feature Added',
    message: 'Check out our new bulk SMS feature!',
    time: '3 hours ago',
    read: true,
    type: 'info'
  }, {
    id: 4,
    title: 'Transaction Failed',
    message: 'Your data bundle purchase failed. Please try again.',
    time: 'Yesterday',
    read: true,
    type: 'error'
  }];
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      default:
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
    }
  };
  return <div ref={panelRef} className="absolute right-0 mt-2 w-80 bg-white dark:bg-secondary-900 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-800 z-50">
      <div className="flex items-center justify-between p-3 border-b border-secondary-200 dark:border-secondary-800">
        <h3 className="font-medium text-secondary-900 dark:text-white">
          Notifications
        </h3>
        <button onClick={onClose} className="text-secondary-500 hover:text-secondary-900 dark:hover:text-white">
          <XIcon size={16} />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map(notification => <div key={notification.id} className={`p-3 border-b border-secondary-200 dark:border-secondary-800 ${notification.read ? 'opacity-70' : ''}`}>
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-secondary-900 dark:text-white">
                {notification.title}
              </h4>
              <span className="text-xs text-secondary-500">
                {notification.time}
              </span>
            </div>
            <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
              {notification.message}
            </p>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getTypeStyles(notification.type)}`}>
                {notification.type}
              </span>
            </div>
          </div>)}
      </div>
      <div className="p-2 border-t border-secondary-200 dark:border-secondary-800 text-center">
        <button className="text-xs text-primary-700 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-400 font-medium">
          View all notifications
        </button>
      </div>
    </div>;
};