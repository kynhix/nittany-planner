import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Category, Task } from "@/lib/core"
import AddTaskButton from "@/components/add-task-button"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { ActiveListContext } from "@/context/active-list-context"
import { useContext, useState } from "react"
import { CheckboxIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {
  const activeList = useContext(ActiveListContext);
  // For the mouse hover/unhover.
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  const showHoverButtons = (task: Task) => {
    setHoveredTaskId(task.id);
  };

  const hideHoverButtons = () => {
    setHoveredTaskId(null);
  };

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

  return (
    <Card className={cn("w-80", "h-fit", className)} {...props}>

      <CardHeader>
        <CardTitle className="font-normal text-xl flex justify-between">
          <span>{category.name}</span>
          <ConfirmDeleteDialog onAction={deleteCategory} />
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 p-3">
        <ul>
          {category.tasks.map((task) => (
            <li className="p-2" key={task.id} onMouseEnter={() => showHoverButtons(task)} onMouseLeave={hideHoverButtons}>
              <div className="flex justify-between">
                <div className="flex w-full">
                  <CheckboxIcon className="mt-1 mr-2"></CheckboxIcon>{task.name}
                </div>
                {hoveredTaskId === task.id &&
                  <div className="h-5">
                    <ConfirmDeleteDialog onAction={() => deleteTask(task)} />
                  </div>
                }
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col">
        <div className="flex justify-betweeen">
          <Button onClick={() => console.log(category)}>Debug</Button>
          <AddTaskButton category={category} />
        </div>
      </CardFooter>

    </Card >
  )
}