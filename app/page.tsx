'use client';

import { CategoryCard } from "@/components/category-card";
import AddCategoryButton from "@/components/add-category-button";
import { useContext } from "react";
import { ActiveListContext } from "@/context/active-list-context";

export default function Home() {
  const activeList = useContext(ActiveListContext);

  return (activeList.id !== -1 ?
    <div className="flex flex-wrap p-8 content-start gap-4">
      {activeList.categories.map((category) =>
        <CategoryCard category={category} key={category.id} />
      )}
      <AddCategoryButton /> {/* Adds AddCategoryButton to the page */}
    </div>
    : <div className="flex m-auto justify-center items-center">Wow such empty. Select a list first.</div>
  );
}
