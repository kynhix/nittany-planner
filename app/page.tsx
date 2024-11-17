'use client';

import { useState } from "react";
import { CategorySidebar } from "@/components/categorysidebar";
import { CardDemo } from "@/components/taskcard";
import { addCategory, addTask, deleteLastTask, toggleTaskCompletion } from "@/lib/utils";
import { Category } from "@/lib/core";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "School",
      taskLists: [
        { id: 101, name: "Hello", tasks: [{ id: 1, title: "Tasks", completed: false }] },
      ],
    },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <CategorySidebar
        categories={categories}
        onCategorySelect={setSelectedCategoryId}
        onAddCategory={(name) => setCategories((prev) => addCategory(prev, name))}
      />
      <div className="flex-1 p-6">
        {selectedCategory ? (
          <div className="grid grid-cols-3 gap-4">
            {selectedCategory.taskLists.map((taskList) => (
              <CardDemo
                key={taskList.id}
                taskList={taskList}
                onAddTask={(id: number, title: string) => setCategories((prev) => addTask(prev, id, title))}
                onDeleteTask={(id: number) => setCategories((prev) => deleteLastTask(prev, id))}
                onToggleTaskCompletion={(taskListId: number, taskId: number) =>
                  setCategories((prev) => toggleTaskCompletion(prev, taskListId, taskId))
                }
              />
            ))}
          </div>
        ) : (
          <p>Select a category to view task lists</p>
        )}
      </div>
    </div>
  );
}
