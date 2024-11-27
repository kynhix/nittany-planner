import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef } from "react";

export default function AddListButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (!inputRef.current) {
      return;
    }
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
