'use client';

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { load, save } from "@/lib/storage";
import { ActiveListContext } from "@/context/active-list-context";
import { useEffect, useState } from "react";
import { TaskList } from "@/lib/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lists, _setLists] = useState<TaskList[]>([]);
  const [activeList, setActiveList] = useState<TaskList>({
    id: -1,
    name: 'invalid list',
    categories: [],
  });

  const updateContext = (list?: TaskList) => {
    if (list) {
      setActiveList(list)
      save(lists)
      return;
    }
    setActiveList({ ...activeList })
    save(lists)
  };

  const setLists = (lists: TaskList[]) => {
    _setLists(lists)
    save(lists)
  }

  useEffect(() => {
    _setLists(load() ?? [])
  }, []);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <ActiveListContext.Provider value={{ ...activeList, updateContext }}>
            <AppSidebar lists={lists} setLists={setLists} />
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
