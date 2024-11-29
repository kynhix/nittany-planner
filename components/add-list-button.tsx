import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover";
import { useContext, useRef } from "react";
import { TaskList } from "@/lib/core";
import { ActiveListContext } from "@/context/active-list-context";

type AddListButtonProps = {
  onClick: (list: TaskList) => void
}

export default function AddListButton({ onClick }: AddListButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeList = useContext(ActiveListContext);

  const addList = (event?: React.FormEvent) => {
    // Prevents the default form submission behavior.
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

    const listName = inputRef.current.value.trim();

    onClick({
      id: Math.floor(Math.random() * 1000000),
      name: inputRef.current.value,
      categories: [],
    })

    activeList.updateContext();
    inputRef.current.value = '';
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PlusIcon />
        {/* <span className="sr-only">Add Project</span> */}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <form onSubmit={addList} className="flex flex-col gap-2">
          <Input ref={inputRef} placeholder="List name" />
          <PopoverClose asChild>
            <Button onClick={addList}>
              Create List
            </Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover>
  )
}
