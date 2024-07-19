import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeletionConfirmationProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  cancelButtonText: string
  confirmButtonText: string
  onDelete: () => void
}

export const DeletionConfirmation = ({
  isOpen,
  onClose,
  title,
  description,
  onDelete,
  cancelButtonText,
  confirmButtonText,
}: DeletionConfirmationProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-72 rounded-lg bg-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className=" bg-sky-700 text-white hover:bg-red-500">
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-700" onClick={() => {
            if (onDelete) {
              onDelete()
              onClose()
            }
          }}>
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}