// Ordered in terms of hierarchy.

export type TaskList = {
  id: number;
  name: string; 
  categories: Category[]; // Contains an array of categories.
};

export type Category = {
  id: number;
  name: string; 
  tasks: Task[]; // Contains an array of t asks.
};

export type Task = {
  id: number;
  name: string;
  completed: boolean; // Tracks completed state for possible reordering, crossing it off, etc.
};
