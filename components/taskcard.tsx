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

type CardProps = React.ComponentProps<typeof Card> & { category: Category }
export function CardDemo({ className, category, ...props }: CardProps) {
  return (
    <Card className={cn("w-80", "h-fit", className)} {...props}>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {category.tasks.map((task) =>
          // TODO: replace with task component
          <div key={task.id}>{task.name}</div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <PlusIcon /> Add new task
        </Button>
      </CardFooter>
    </Card>
  )
}
