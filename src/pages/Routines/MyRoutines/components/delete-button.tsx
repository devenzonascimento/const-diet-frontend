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

import { Trash2Icon } from "lucide-react"

interface DeleteButtonProps {
  onDelete: () => void
}

export const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-72 rounded-lg bg-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente essa rotina da sua lista de rotinas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" bg-red-700 text-white hover:bg-red-500">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-sky-700" onClick={onDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}