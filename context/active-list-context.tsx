import { TaskList } from "@/lib/core";
import { createContext } from "react";

export type ListContextType = TaskList & { updateContext: () => void };
export const ActiveListContext = createContext<ListContextType>({
  name: 'invalid',
  id: 0,
  categories: [],
  updateContext: () => undefined
});
