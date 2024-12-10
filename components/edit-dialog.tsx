import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRef, useState } from "react"


type EditDialogProps = {
  defaultValue: string
  name: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSubmit: (s: string) => void
}

export function EditDialog(props: EditDialogProps) {
  const [text, setText] = useState(props.defaultValue)
  const [canSubmit, setCanSubmit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (!inputRef.current) {
      return;
    }

    // onSubmit(inputRef.current.value.trim())
    inputRef.current.value = '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    const s = event.target.value.trim()
    setCanSubmit(s !== '')
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Edit {props.name}</DialogTitle>
          <DialogDescription>
            Edit the name of the {props.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            ref={inputRef}
            placeholder={`${props.name} name`}
            value={text}
            onChange={handleChange} />
          <DialogClose asChild>
            <Button disabled={!canSubmit} type="submit">Save {props.name}</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>)
}
