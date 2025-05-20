import { SidebarProvider } from "@/components/ui/sidebar"; // adjust path
import { AppSidebar } from "@/components/dashboard/DashboardAside";
import OverviwHeader from "@/components/dashboard/overview/overviewHeader/OverviwHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative">
        <AppSidebar />
        <main className="flex-1">
          <OverviwHeader />
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
