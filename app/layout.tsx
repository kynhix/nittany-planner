'use client';

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { load } from "@/lib/storage";
import { useEffect, useState } from "react";
import { TaskList } from "@/lib/core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lists, setLists] = useState<TaskList[]>([]);

  useEffect(() => {
    setLists(load())
  }, []);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar lists={lists} />
          <main className="flex w-full h-screen">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
