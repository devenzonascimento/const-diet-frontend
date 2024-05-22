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
  OnDelete: () => void
}

export const DeleteButton = ({OnDelete}: DeleteButtonProps) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-32 rounded-md text-sm font-medium ring-offset-background bg-red-700 text-white hover:bg-red-500">

          Excluir alimento

      </AlertDialogTrigger>
      <AlertDialogContent className="w-72 rounded-lg bg-slate-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente esse alimento da sua lista de alimentos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" bg-red-700 text-white hover:bg-red-500">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-sky-700" onClick={OnDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}