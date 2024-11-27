"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TaskList } from "@/lib/core";
import AddListButton from "./add-list-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { ActiveListContext } from "@/context/active-list-context";

type AppSidebarProps = {
  lists: TaskList[]
  setLists: (lists: TaskList[]) => void
}

export function AppSidebar({ lists, ...props }: AppSidebarProps) {
  const activeList = useContext(ActiveListContext);

  const onClickList = (list: TaskList) => {
    activeList.updateContext(list)
  }

  const onAddList = (list: TaskList) => {
    lists.push(list)
    props.setLists(lists.slice())
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Lists</SidebarGroupLabel>
          <SidebarGroupAction title="Add List">
            <AddListButton onClick={onAddList} />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {lists.length !== 0 ? lists.map((list) => (
                <SidebarMenuItem key={list.name}>
                  <SidebarMenuButton onClick={() => onClickList(list)} asChild isActive={activeList.id === list.id}>
                    <span>{list.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
                : (
                  <div className="border p-2 mt-2 rounded-md">
                    <span>👀 Looks empty</span> <br /> Click the <PlusIcon className="inline-block" /> to create your first list.
                  </div>
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
