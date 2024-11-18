import { TaskList } from "@/lib/core";
import { createContext } from "react";

// Gives access to every data type in the application using React Context.
export type ListContextType = TaskList & { updateContext: () => void };
export const ActiveListContext = createContext<ListContextType>({
  name: 'invalid',
  id: 0,
  categories: [],
  updateContext: () => undefined
});
