import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Category, Task } from "@/lib/core"
import AddTaskButton from "@/components/add-task-button"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { ActiveListContext } from "@/context/active-list-context"
import { useContext, useState } from "react"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { ModifyTaskPopover } from "./modify-task-popover"
import { DropdownEditDelete } from "./dropdown-edit-delete"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {
  const activeList = useContext(ActiveListContext);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const deleteCategory = () => {
    activeList.categories = activeList.categories.filter((cat) => cat !== category)
    activeList.updateContext(activeList)
  }

  const deleteTask = (task: Task) => {
    // indexToDelete is -1 initially in case index isn't valid.
    let indexToDelete = -1;
    for (let i = 0; i < category.tasks.length; i++) {
      if (category.tasks[i].id == task.id) {
        indexToDelete = i;
        break;
      }
    }
    // Only if the index of the task is found.
    if (indexToDelete != -1) {
      category.tasks.splice(indexToDelete, 1);
    }
    activeList.updateContext(activeList)
  };

  // Modify Task Logic
  const modifyTask = (task: Task | null, action: "open" | "save" | "close", updatedTask?: Task) => {
    // Opens the popover and selects the task.
    if (action === "open" && task) {
      setSelectedTask(task);
    }
    // Closes the popover and clears the selected task.
    if (action === "close") {
      setSelectedTask(null);
    }
    // Saves the task.
    // Update the task in the category.tasks array.
    // Closes the popover and clears the selected task.
    if (action === "save" && updatedTask) {
      category.tasks = category.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      setSelectedTask(null);
    }
    activeList.updateContext(activeList);
  };


  return (
    <Card className={cn("w-80", "h-fit", className)} {...props}>

      <CardHeader>
        <CardTitle className="font-normal text-xl flex justify-between">
          <span>{category.name}</span>
          <DropdownEditDelete name="Category" onDelete={deleteCategory} onEdit={() => undefined}>
            <button>
              <DotsHorizontalIcon />
            </button>
          </DropdownEditDelete>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-3">
        <ul>
          {category.tasks.map((task) => (
            <li
              className="p-2 border"
              key={task.id}>
              <div className="flex items-center">
                <div className="flex-none">
                  <input type="checkbox" className="mt-1 mr-2" />
                </div>
                <div
                  className="flex-grow w-full justify-center align-center"
                  onClick={() => modifyTask(task, "open")}
                >
                  <span className="w-full">{task.name}</span>
                </div>
                {/* Delete Button. */}
                <div className="flex-none">
                  <DropdownEditDelete name="Task" onDelete={() => deleteTask(task)} onEdit={() => undefined}>
                    <button>
                      <DotsHorizontalIcon />
                    </button>
                  </DropdownEditDelete>
                </div>
              </div>
              {/* The modify task popover. */}
              {selectedTask?.id === task.id && (
                <Popover
                  // Opens the popover when its clicked.
                  open={true}
                  onOpenChange={(isOpen) => !isOpen && setSelectedTask(null)}>
                  <PopoverTrigger asChild>
                    {/*Not sure why, but this div is required for it to render. */}
                    <div />
                  </PopoverTrigger>
                  <ModifyTaskPopover
                    // Selects a tesk, saves and modifies it, and closes the popover.
                    task={selectedTask}
                    onSave={(updatedTask) => modifyTask(null, "save", updatedTask)}
                    onClose={() => modifyTask(null, "close")}
                  />
                </Popover>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <AddTaskButton category={category} />
      </CardFooter>
    </Card >
  )
}
