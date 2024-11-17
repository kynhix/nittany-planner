// Represents a category containing multiple task lists
export type Category = {
  id: number;             // Unique identifier for the category
  name : string;          // Name of the category
  taskLists : TaskList[]; // Array of task lists in this category
};

// Represents a task list containing multiple tasks
export type TaskList = {
  id: number;     // Unique identifier for the task list
  name : string;  // Name of the task list
  tasks : Task[]; // Array of tasks in this list
};

// Represents a single task
export type Task = {
  id: number;          // Unique identifier for the task
  title : string;      // The task's title
  completed : boolean; // Whether the task is completed
};
