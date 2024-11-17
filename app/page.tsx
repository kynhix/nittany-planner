'use client';

import { CategoryCard } from "@/components/category-card";

export default function Home() {
  return (
    <div className="flex flex-wrap p-8">
      <CategoryCard category={{ id: 0, name: 'This is my category', tasks: [{ id: 0, name: 'my task', completed: false }] }}></CategoryCard>
    </div>
  );
}
