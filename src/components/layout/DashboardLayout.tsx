import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
interface DashboardLayoutProps {
  children: React.ReactNode;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  toggleDarkMode,
  isDarkMode
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return <div className="flex h-screen w-full bg-surface-light dark:bg-surface-dark">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>;
};