import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef, useState } from "react";

type PopoverInputStringProps = {
  defaultText?: string
  name: string
  children: React.ReactNode
  onSubmit: (s: string) => void
};

export default function PopoverInputString({ defaultText, children, name, onSubmit }: PopoverInputStringProps) {
  const [canSubmit, setCanSubmit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

    onSubmit(inputRef.current.value.trim())
    inputRef.current.value = '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const s = event.currentTarget.value.trim()
    setCanSubmit(s !== '')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-56">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            placeholder={`${name} name`}
            defaultValue={defaultText}
            onChange={handleChange} />
          <PopoverClose asChild>
            <Button disabled={!canSubmit} type="submit">{defaultText ? 'Save' : 'Create'} {name}</Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover >
  )
}
