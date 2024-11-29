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
import { Task, TaskList } from "@/lib/core";
import AddListButton from "./add-list-button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { ActiveListContext } from "@/context/active-list-context";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";

type AppSidebarProps = {
  lists: TaskList[]
  setLists: (lists: TaskList[]) => void
}

export function AppSidebar({ lists, ...props }: AppSidebarProps) {
  const activeList = useContext(ActiveListContext);
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  const onClickList = (list: TaskList) => {
    activeList.updateContext(list)
  }

  const onAddList = (list: TaskList) => {
    lists.push(list)
    props.setLists(lists.slice())
  }

  const showHoverButtons = (list: TaskList) => {
    setHoveredTaskId(list.id)
  };

  const hideHoverButtons = () => {
    setHoveredTaskId(null)
  };

  const deleteList = (list: TaskList) => {
    props.setLists(lists.filter((l) => l.id != list.id).slice())
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
                <SidebarMenuItem key={list.id}
                  onMouseEnter={() => showHoverButtons(list)}
                  onMouseLeave={hideHoverButtons}>
                  <SidebarMenuButton onClick={() => onClickList(list)} isActive={activeList.id === list.id} asChild>
                    <div className="flex justify-between">
                      <span>{list.name}</span>
                      {hoveredTaskId === list.id && (<ConfirmDeleteDialog onAction={() => deleteList(list)} />)}
                    </div>
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
