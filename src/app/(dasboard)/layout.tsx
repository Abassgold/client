import OverviwHeader from "@/components/dashboard/overview/overviewHeader/OverviwHeader";
import { ResponsiveSidebar } from "@/components/dashboard/DashboardAside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen w-full dark:bg-slate-900">
     <ResponsiveSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <OverviwHeader />
          <main className="flex-1 overflow-y-auto py-6 px-2 md:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
      </div>
    </div>
  );
}
