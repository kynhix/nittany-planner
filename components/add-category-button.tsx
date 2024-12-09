import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ActiveListContext } from "@/context/active-list-context";
import { PlusIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useContext, useRef } from "react";

export default function AddCategoryButton() {
  const activeList = useContext(ActiveListContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const addCategory = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

    activeList.categories.push({
      id: Math.floor(Math.random() * 1000000),
      name: inputRef.current.value,
      tasks: [],
    })
    activeList.updateContext();
    inputRef.current.value = '';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <PlusIcon /> Add new category
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <form onSubmit={addCategory} className="flex flex-col gap-2">
          <Input ref={inputRef} placeholder="Category name" />
          <PopoverClose asChild>
            <Button type="submit">Create</Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover >
  )
}
