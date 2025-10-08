import React from 'react';
import { HomeIcon, PhoneIcon, WifiIcon, TvIcon, ZapIcon, RefreshCcwIcon, MessageSquareIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronRightIcon, GlobeIcon, DollarSignIcon } from 'lucide-react';
import Link from 'next/link';
interface SidebarProps {
  collapsed: boolean;
}
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
}
const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  collapsed,
  active
}) => {
  return <Link href={to} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-all ${active ? 'bg-teal-700 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      <div className="flex items-center">
        <span className="w-5 h-5">{icon}</span>
        {!collapsed && <span className="ml-3 text-sm font-medium whitespace-nowrap">
            {label}
          </span>}
      </div>
      {active && !collapsed && <ChevronRightIcon className="ml-auto w-4 h-4" />}
    </Link>;
};
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed
}) => {
  const navItems = [{
    to: '/',
    icon: <HomeIcon size={18} />,
    label: 'Dashboard'
  }, {
    to: '/airtime',
    icon: <PhoneIcon size={18} />,
    label: 'Airtime Recharge'
  }, {
    to: '/data',
    icon: <WifiIcon size={18} />,
    label: 'Data Bundles'
  }, {
    to: '/virtual-number',
    icon: <GlobeIcon size={18} />,
    label: 'Virtual Number'
  }, {
    to: '/esim',
    icon: <DollarSignIcon size={18} />,
    label: 'eSIM'
  }, {
    to: '/usdt',
    icon: <DollarSignIcon size={18} />,
    label: 'USDT'
  }, {
    to: '/cable-tv',
    icon: <TvIcon size={18} />,
    label: 'Cable TV'
  }, {
    to: '/electricity',
    icon: <ZapIcon size={18} />,
    label: 'Electricity'
  }, {
    to: '/airtime-to-cash',
    icon: <RefreshCcwIcon size={18} />,
    label: 'Airtime to Cash'
  }, {
    to: '/bulk-sms',
    icon: <MessageSquareIcon size={18} />,
    label: 'Bulk SMS'
  }];
  const bottomNavItems = [{
    to: '/settings',
    icon: <SettingsIcon size={18} />,
    label: 'Settings'
  }, {
    to: '/help',
    icon: <HelpCircleIcon size={18} />,
    label: 'Help & Support'
  }, {
    to: '/logout',
    icon: <LogOutIcon size={18} />,
    label: 'Logout'
  }];
  return <aside className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-center">
        {collapsed ? <div className="w-8 h-8 bg-teal-900 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div> : <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="ml-3 font-bold text-slate-900 dark:text-white">
              FloZap
            </span>
          </div>}
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.map(item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} active={location.pathname === item.to} />)}
        </nav>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-4">
        <nav className="space-y-1">
          {bottomNavItems.map(item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} active={location.pathname === item.to} />)}
        </nav>
      </div>
    </aside>;
};