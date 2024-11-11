"use client";

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
import * as storage from "@/lib/storage"
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Home",
  },
  {
    title: "Inbox",
  },
  {
    title: "Calendar",
  },
  {
    title: "Search",
  },
  {
    title: "Settings",
  },
]

export function AppSidebar() {
  const [count, setCount] = useState({ count: 1 });
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Lists {count.count}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <span onClick={() => count.count += 1}>{item.title}</span>
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
