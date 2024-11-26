import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Category } from "@/lib/core"
import AddTaskButton from "@/components/add-task-button"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"
import { ActiveListContext } from "@/context/active-list-context"
import { useContext } from "react"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {
  const activeList = useContext(ActiveListContext);

  const onDelete = () => {
    activeList.categories = activeList.categories.filter((cat) => cat !== category)
    activeList.updateContext(activeList)
  }

  return (
    <Card className={cn("w-80", "h-fit", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-normal text-xl flex justify-between">
          <span>{category.name}</span>
          <ConfirmDeleteDialog onAction={onDelete} />
        </CardTitle>
      </CardHeader>

      {/* TODO: Create a task component and replace the code below with it. */}
      <CardContent className="grid gap-4 p-3">
        {category.tasks.map((task) =>
          <div key={task.id}>{task.name}</div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between content-end">
        <AddTaskButton category={category} />
      </CardFooter>
    </Card>
  )
}
