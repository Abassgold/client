import { Calendar, Home, Banknote, Bitcoin, Settings, Gift, Hash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Overview",
    url: "/dasboard",
    icon: Home,
  },
  {
    title: "Utility Payments",
    url: "/utilities",
    icon: Banknote,
  },
  {
    title: "Recharge & Subscriptions",
    url: "/recharge",
    icon: Calendar,
  },
  {
    title: "Sell Crypto",
    url: "/crypto",
    icon: Bitcoin,
  },
  {
    title: "Gift Cards",
    url: "/giftcards",
    icon: Gift,
  },
  {
    title: "Virtual Numbers",
    url: "/virtualnumbers",
    icon: Hash,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="h-full">
      <SidebarContent className="bg-[#1f2937] text-white">
        <SidebarGroup >
          <SidebarGroupLabel className="text-3xl text-white py-6 mb-4">FloZap</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="py-6 hover:bg-gray-800">
                      <item.icon   className=" text-teal-500"/>
                      <p className="text-[1rem]">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
