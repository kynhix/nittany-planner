import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ActiveListContext } from "@/context/active-list-context";
import { TaskList } from "@/lib/core";
import { PlusIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useContext, useRef } from "react";

type AddListButtonProps = {
  onClick: (list: TaskList) => void
}

export default function AddListButton({ onClick }: AddListButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeList = useContext(ActiveListContext);

  const addList = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

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
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <form onSubmit={addList} className="flex flex-col gap-2">
          <Input ref={inputRef} placeholder="List name" />
          <PopoverClose asChild>
            <Button onClick={addList}>Create List</Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover>
  )
}
