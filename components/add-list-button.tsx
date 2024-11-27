import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef } from "react";
import { TaskList } from "@/lib/core";

type AddListButtonProps = {
  onClick: (list: TaskList) => void
}

export default function AddListButton({ onClick }: AddListButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (!inputRef.current) {
      return;
    }

    onClick({
      id: Math.floor(Math.random() * 1000000),
      name: inputRef.current.value,
      categories: [],
    })

    inputRef.current.value = ''
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PlusIcon />
        {/* <span className="sr-only">Add Project</span> */}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <Input ref={inputRef} placeholder="List name" />
        <PopoverClose asChild>
          <Button onClick={onClickHandler}>
            Create List
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
