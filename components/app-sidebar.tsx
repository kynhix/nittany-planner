"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TaskList } from "@/lib/core";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { ActiveListContext } from "@/context/active-list-context";
import { DropdownEditDelete } from "./dropdown-edit-delete";
import PopoverInputString from "./popover-input-string";

type AppSidebarProps = {
  lists: TaskList[]
  setLists: (lists: TaskList[]) => void
}

export function AppSidebar({ lists, ...props }: AppSidebarProps) {
  const activeList = useContext(ActiveListContext);

  const onClickList = (list: TaskList) => {
    activeList.updateContext(list)
  }

  const onAddList = (s: string) => {
    props.setLists([...lists, {
      id: Math.floor(Math.random() * 1000000),
      name: s,
      categories: [],
    }])
  }

  const deleteList = (list: TaskList) => {
    props.setLists(lists.filter((l) => l.id != list.id))
  }

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Lists</SidebarGroupLabel>
            <SidebarGroupAction title="Add List">
              <PopoverInputString name="List" onSubmit={onAddList}>
                <PlusIcon />
              </PopoverInputString>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {lists.length !== 0 ? lists.map((list) => (
                  <SidebarMenuItem key={list.id}>
                    <SidebarMenuButton
                      onClick={() => onClickList(list)}
                      isActive={activeList.id === list.id}
                      asChild>
                      <span>{list.name}</span>
                    </SidebarMenuButton>
                    <DropdownEditDelete name="List" onDelete={() => deleteList(list)} defaultValue={list.name} onEdit={() => undefined}>
                      <SidebarMenuAction>
                        <DotsHorizontalIcon />
                      </SidebarMenuAction>
                    </DropdownEditDelete>
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
    </>
  )
}
