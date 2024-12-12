import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Category, Task } from "@/lib/core"
import { ActiveListContext } from "@/context/active-list-context"
import { useContext } from "react"
import { DropdownEditDelete } from "./dropdown-edit-delete"
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import PopoverInputString from "./popover-input-string"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {
  const activeList = useContext(ActiveListContext);

  const addTask = (s: string) => {
    category.tasks.push({
      id: Math.floor(Math.random() * 1000000),
      name: s,
      completed: false,
    });

    activeList.updateContext();
  };

  const modifyCategory = (s: string, c: Category) => {
    c.name = s
    activeList.updateContext();
  }

  const modifyTask = (s: string, t: Task) => {
    t.name = s
    activeList.updateContext();
  }

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
          <DropdownEditDelete
            name="Category"
            defaultValue={category.name}
            onDelete={deleteCategory}
            onEdit={(s) => modifyCategory(s, category)}>
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
              <span className={cn('w-full', task.completed ? 'line-through' : '')}>{task.name}</span>
              <DropdownEditDelete
                name="Task"
                defaultValue={task.name}
                onDelete={() => deleteTask(task)}
                onEdit={(s) => modifyTask(s, task)}>
                <button>
                  <DotsHorizontalIcon />
                </button>
              </DropdownEditDelete>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <PopoverInputString name="Task" onSubmit={addTask}>
          <Button className="w-full bg-neutral-700">
            <PlusIcon /> Add task
          </Button>
        </PopoverInputString>
      </CardFooter>
    </Card >
  )
}
