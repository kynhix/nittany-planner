import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusIcon } from "@radix-ui/react-icons"
import { Category } from "@/lib/core"
import AddTaskButton from "@/components/add-task-button"

type CardProps = React.ComponentProps<typeof Card> & { category: Category }

export function CategoryCard({ className, category, ...props }: CardProps) {

  return (
    <Card className={cn("w-80", "h-fit", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-center">{category.name}</CardTitle>
      </CardHeader>

      {/* TODO: Create a task component and replace the code below with it. */}
      <CardContent className="grid gap-4 p-3">
        {category.tasks.map((task) =>
          <div key={task.id}>{task.name}</div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between content-end">
        {/* Debug button that shows specific category in console*/}
        <Button onClick={() => console.log(category)}>Debug</Button>
        <AddTaskButton category={category} />
      </CardFooter>
    </Card>
  )
}
