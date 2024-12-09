import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDialogDropdown } from "./ui/use-dialog";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";

type DropdownEditDeleteProps = {
  name: string;
  children: React.ReactNode
  onDelete: () => void
  onEdit: (name: string) => void
};

export function DropdownEditDelete({ name, children, onDelete }: DropdownEditDeleteProps) {
  const editDialog = useDialogDropdown()
  const deleteDialog = useDialogDropdown()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem {...editDialog.triggerProps}>
            <span>Edit {name}</span>
          </DropdownMenuItem>
          <DropdownMenuItem {...deleteDialog.triggerProps}>
            <span>Delete {name}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDeleteDialog {...deleteDialog.dialogProps} noChild onAction={onDelete} />
    </>
  )
}
