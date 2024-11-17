import { Category } from "./core";
import { clsx, type ClassValue } from "clsx";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

let idCounter = 0; // Global counter for unique IDs

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add a new category to the categories array
export function addCategory(categories: Category[], name: string): Category[] {
  return [
    ...categories,
    { id: Date.now(), name, taskLists: [] },
  ];
}

// Add a new task list to a specific category
export function addTaskList(
  categories: Category[],
  categoryId: number,
  name: string
): Category[] {
  return categories.map((cat) =>
    cat.id === categoryId
      ? { ...cat, taskLists: [...cat.taskLists, { id: Date.now(), name, tasks: [] }] }
      : cat
  );
}

// Add a new task to a specific task list
export function addTask(
  categories: Category[],
  taskListId: number,
  title: string
): Category[] {
  let idCounter = 0;
  return categories.map((cat) => ({
    ...cat,
    taskLists: cat.taskLists.map((list) =>
      list.id === taskListId
        ? {
            ...list,
            tasks: [
              ...list.tasks,
              { id: ++idCounter, title, completed: false },
            ],
          }
        : list
    ),
  }));
}



// Delete the last task from a specific task list
export function deleteLastTask(
  categories: Category[],
  taskListId: number
): Category[] {
  return categories.map((category) => ({
    ...category,
    taskLists: category.taskLists.map((taskList) =>
      taskList.id === taskListId && taskList.tasks.length > 0
        ? { ...taskList, tasks: taskList.tasks.slice(0, -1) }
        : taskList
    ),
  }));
}

// Toggle task completion state
export function toggleTaskCompletion(
  categories: Category[],
  taskListId: number,
  taskId: number
): Category[] {
  return categories.map((cat) => ({
    ...cat,
    taskLists: cat.taskLists.map((list) =>
      list.id === taskListId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
        : list
    ),
  }));
}
