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

  const addTask = () => {
    if (!inputRef.current) {
      return;
    }
    category.tasks.push({
      id: Math.floor(Math.random() * 1000000),
      name: inputRef.current.value,
      completed: false,
    })
    // Updates the activeList context so that changes/updates are immediately available.
    activeList.updateContext();
    inputRef.current.value = ''
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full">
          <PlusIcon /> Add task
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        {/* Input field that stores input as inputRef */}
        <Input ref={inputRef} placeholder="Task name" />
        <PopoverClose asChild>
          <Button onClick={addTask}>
            Create
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
