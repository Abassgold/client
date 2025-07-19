import { AdminLayout } from "@/components/admin/AdminLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside>
        <AdminLayout />
      </aside>
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
