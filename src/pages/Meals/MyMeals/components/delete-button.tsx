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

interface DeleteButtonProps {
  onDelete: () => void
}

export const DeleteButton = ({onDelete}: DeleteButtonProps) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-32 rounded-md text-sm font-medium ring-offset-background bg-red-700 text-white hover:bg-red-500">
          Excluir refeição
      </AlertDialogTrigger>
      <AlertDialogContent className="w-72 rounded-lg bg-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente essa refeição da sua lista de refeições.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" bg-red-700 text-white hover:bg-red-500">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-sky-700" onClick={onDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}