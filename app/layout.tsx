'use client';

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar";
import { load, save } from "@/lib/storage";
import { ActiveListContext } from "@/context/active-list-context";
import { useCallback, useEffect, useState } from "react";
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
      _setLists(lists.map((l) => l.id === list.id ? list : l))
      return;
    }
    setActiveList({ ...activeList })
    save(lists)
  };

  const setLists = useCallback((newLists: TaskList[]) => {
    _setLists(newLists)
    save(newLists)
  }, [])

  useEffect(() => {
    _setLists(load() ?? [])
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <ActiveListContext.Provider value={{ ...activeList, updateContext }}>
              <AppSidebar lists={lists} setLists={setLists} />
              <main className="flex w-full h-screen">
                <SidebarTrigger />
                {children}
              </main>
            </ActiveListContext.Provider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
