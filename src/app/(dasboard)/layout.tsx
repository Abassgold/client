import OverviwHeader from "@/components/dashboard/overview/overviewHeader/OverviwHeader";
import { ResponsiveSidebar } from "@/components/dashboard/DashboardAside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex  flex-col md:flex-row h-screen relative">
        <ResponsiveSidebar />
        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-20 w-full">
            <OverviwHeader />
          </div>

          <main className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
  );
}
