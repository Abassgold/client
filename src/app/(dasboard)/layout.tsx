import OverviwHeader from "@/components/dashboard/overview/overviewHeader/OverviwHeader";
import { ResponsiveSidebar } from "@/components/dashboard/DashboardAside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
<div className="flex h-screen relative overflow-hidden">
  <ResponsiveSidebar />
  <div className="flex-1 flex flex-col">
    <OverviwHeader />
    <main className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-100">
      {children}
    </main>
  </div>
</div>

  );
}
