'use client';

import { CategoryCard } from "@/components/category-card";
import { useContext } from "react";
import { ActiveListContext } from "@/context/active-list-context";
import PopoverInputString from "@/components/popover-input-string";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Home() {
  const activeList = useContext(ActiveListContext);

  const addCategory = (s: string) => {
    activeList.categories.push({
      id: Math.floor(Math.random() * 1000000),
      name: s,
      tasks: [],
    })
    activeList.updateContext();
  };

  return (activeList.id !== -1 ?
    <div className="flex flex-wrap p-8 content-start gap-4">
      {activeList.categories.map((category) =>
        <CategoryCard category={category} key={category.id} />
      )}
      <PopoverInputString name="Category" onSubmit={addCategory}>
        <Button className="w-80">
          <PlusIcon /> Add category
        </Button>
      </PopoverInputString>
    </div>
    : <div className="flex m-auto justify-center items-center">Wow such empty. Select a list first.</div>
  );
}
