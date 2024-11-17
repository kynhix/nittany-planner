export type Category = {
  id: number;             // Unique identifier for the category
  name: string;          // Name of the category
  tasks: Task[]; // Array of task lists in this category
};

export type TaskList = {
  id: number;     // Unique identifier for the task list
  name: string;  // Name of the task list
  categories: Category[]; // Array of categories
};

export type Task = {
  id: number;          // Unique identifier for the task
  name: string;      // The task's name 
  completed: boolean; // Whether the task is completed
};
