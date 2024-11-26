import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ActiveListContext } from "@/context/active-list-context";
import { Input } from "@/components/ui/input"
import { useContext, useRef } from "react";

export default function AddCategoryButton() {
  const activeList = useContext(ActiveListContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (!inputRef.current) {
      return;
    }
    activeList.categories.push({
      id: Math.floor(Math.random() * 1000000),
      name: inputRef.current.value,
      tasks: [],
    })
    activeList.updateContext();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <PlusIcon /> Add new category
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <Input ref={inputRef} placeholder="Category name" />
        <Button onClick={onClickHandler}>
          Create
        </Button>
      </PopoverContent>
    </Popover>
  )
}
