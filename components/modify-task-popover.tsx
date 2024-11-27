import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { Task } from "@/lib/core";
import { Label } from "@radix-ui/react-label";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef } from "react";

type ModifyTaskPopoverProps = {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onClose: () => void;
};

export function ModifyTaskPopover({ task, onSave, onClose }: ModifyTaskPopoverProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSave = (event?: React.FormEvent) => {
        if (event) {
            event.preventDefault();
        }
        if (!inputRef.current) {
            return;
        }
        const updatedTask = { ...task, name: inputRef.current.value };
        onSave(updatedTask);
        onClose();
        inputRef.current.value = '';
    };

    return (
        <PopoverContent className="flex flex-col gap-4 p-4">
            <form onSubmit={handleSave} className="flex flex-col gap-2">
                <Label htmlFor="taskName" className="text-sm font-medium">
                    Modify task name
                </Label>
                <Input
                    ref={inputRef}
                    id="taskName"
                    defaultValue={task.name}
                    placeholder="Enter a new task name"
                />
                <div className="flex justify-end gap-2">
                    <PopoverClose asChild>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </PopoverClose>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </PopoverContent>

    );
}
