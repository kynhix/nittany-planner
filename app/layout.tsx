'use client';

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { load } from "@/lib/storage";
import { ActiveListContext } from "@/context/active-list-context";
import { useEffect, useState } from "react";
import { TaskList } from "@/lib/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lists, setLists] = useState<TaskList[]>([]);
  const [activeList, setActiveList] = useState<TaskList>({
    id: -1,
    name: 'invalid list',
    categories: [],
  });

  const updateContext = (list?: TaskList) => {
    if (list) {
      setActiveList(list)
      return;
    }
    setActiveList({ ...activeList })
  };

  useEffect(() => {
    setLists(load())
  }, []);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <ActiveListContext.Provider value={{ ...activeList, updateContext }}>
            <AppSidebar lists={lists} />
            <main className="flex w-full h-screen">
              <SidebarTrigger />
              {children}
            </main>
          </ActiveListContext.Provider>
        </SidebarProvider>
      </body>
    </html>
  );
}
