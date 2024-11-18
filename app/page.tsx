'use client';

import { ActiveListContext } from "@/context/active-list-context";
import { CategoryCard } from "@/components/category-card";
import { TaskList } from "@/lib/core";
import { useState } from "react";
import AddCategoryButton from "@/components/add-category-button";

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
    <div className="flex flex-wrap p-8 content-start gap-4">
      <ActiveListContext.Provider value={{ ...activeList, updateContext }}>
        {activeList.categories.map((category) =>
          <CategoryCard category={category} key={category.id} />
        )}
        <AddCategoryButton /> {/* Adds AddCategoryButton to the page */}
      </ActiveListContext.Provider>
    </div>
  );
}
