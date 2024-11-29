import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

type ConfirmDeleteDialogProps = {
  onAction?: () => void
  onCancel?: () => void
  children?: React.ReactNode
};

export function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {props.children ?? (
          <Button className="p-2 h-full aspect-square bg-red-900 hover:bg-red-800">
            <TrashIcon className="text-red-50" />
          </Button>)}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={props.onAction}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
