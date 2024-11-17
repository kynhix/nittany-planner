'use client';

import { ActiveListContext } from "@/context/active-list-context";
import { CategoryCard } from "@/components/category-card";
import { TaskList } from "@/lib/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [activeList, setActiveList] = useState<TaskList>({
    id: 0,
    name: 'My list',
    categories: [],
  });

  const updateContext = () => {
    setActiveList({ ...activeList })
  };

  return (
    <div className="flex flex-wrap p-8">
      <ActiveListContext.Provider value={{ ...activeList, updateContext }}>
        <Button><PlusIcon /> Add category</Button>
        {/* <CategoryCard category={ } /> */}
      </ActiveListContext.Provider>
    </div>
  );
}
