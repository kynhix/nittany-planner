import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Category, Task } from "@/lib/core"
import AddTaskButton from "@/components/add-task-button"
import { ActiveListContext } from "@/context/active-list-context"
import { useContext } from "react"
import { DropdownEditDelete } from "./dropdown-edit-delete"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {
  const activeList = useContext(ActiveListContext);

  const deleteCategory = () => {
    activeList.categories = activeList.categories.filter((cat) => cat !== category)
    activeList.updateContext(activeList)
  }

  const deleteTask = (task: Task) => {
    category.tasks = category.tasks.filter(t => t.id !== task.id)
    activeList.updateContext(activeList)
  };

  const toggleTaskCompletion = (task: Task) => {
    task.completed = !task.completed
    activeList.updateContext()
  }

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
              className="flex items-center p-2 gap-2"
              key={task.id}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task)} />
              <span className="w-full">{task.name}</span>
              <DropdownEditDelete name="Task" onDelete={() => deleteTask(task)} onEdit={() => undefined}>
                <button>
                  <DotsHorizontalIcon />
                </button>
              </DropdownEditDelete>
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
