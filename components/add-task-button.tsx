import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ActiveListContext } from "@/context/active-list-context";
import { Input } from "@/components/ui/input"
import { useContext, useRef } from "react";
import { Category } from "@/lib/core";
import { PopoverClose } from "@radix-ui/react-popover";

// PARAM -> Passes a specific category object to this function which allows it to populate that specific category.
export default function AddTaskButton({ category }: { category: Category }) {
  const activeList = useContext(ActiveListContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (event?: React.FormEvent) => {
    // Prevents the default form submission behavior.
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

    const taskName = inputRef.current.value.trim();
    category.tasks.push({
      id: Math.floor(Math.random() * 1000000),
      name: taskName,
      completed: false,
    });

    activeList.updateContext();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full">
          <PlusIcon /> Add task
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <form onSubmit={addTask} className="flex flex-col gap-2">
          <Input ref={inputRef} placeholder="Task name" />
          <PopoverClose asChild>
            <Button type="submit">Create</Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover>
  );
}