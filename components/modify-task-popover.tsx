import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { Task } from "@/lib/core";
import { Label } from "@radix-ui/react-label";
import { useRef } from "react";

type ModifyTaskPopoverProps = {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onClose: () => void;
};

export function ModifyTaskPopover({ task, onSave, onClose }: ModifyTaskPopoverProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        if (inputRef.current) {
            // Updates the task object.
            const updatedTask = { ...task, name: inputRef.current.value };
            onSave(updatedTask);
        } else {
            console.error("Error: Input field is not accessible.");
        }
        onClose();
    };

    return (
        <PopoverContent className="p-4 space-y-4">
            {/* Task name label and input. */}
            <div>
                <Label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                    Modify task name
                </Label>
                <Input
                    ref={inputRef}
                    id="taskName"
                    defaultValue={task.name}
                    placeholder="Enter a new task name"
                    className="mt-1"
                />
            </div>

            {/* Styling to match the confirm-delete-dialog style. */}
            <div className="flex justify-between">
                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-4 py-2"
                    onClick={onClose}>
                    Cancel
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2"
                    onClick={handleSave}
                >
                    Save
                </button>


            </div>



        </PopoverContent>
    );
}
