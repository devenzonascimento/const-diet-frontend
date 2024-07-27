import { useModalState } from "@/hooks/use-modal-state";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { DeletionConfirmation } from "./deletion-confirmation";

interface DropdownMenuProps {
  alertDialogTitle: string
  alertDialogDescription: string
  onEditOptionClick: () => void;
  onDeleteOptionClick: () => void;
}

export const DropdownMenu = ({
  alertDialogTitle,
  alertDialogDescription,
  onEditOptionClick,
  onDeleteOptionClick
}: DropdownMenuProps) => {

  const { isOpen, toggleModal } = useModalState()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
        >
          <EllipsisVerticalIcon size={32}/>
        </button>
      </PopoverTrigger>
      <DeletionConfirmation
        isOpen={isOpen}
        onClose={toggleModal}
        title={alertDialogTitle}
        description={alertDialogDescription}
        cancelButtonText="Cancelar"
        confirmButtonText="Excluir"
        onDelete={onDeleteOptionClick}
      />
      <PopoverContent className="w-min p-0 mr-1 border-sky-950">
        <button onClick={onEditOptionClick} className="flex items-center gap-2 p-2 text-sky-950">
          <PencilIcon size={24} />
          <span className="text-xl font-medium">
            Editar
          </span>
        </button>
        <hr className="border-slate-300" />
        <button onClick={toggleModal} className="flex items-center gap-2 p-2 text-red-500">
          <Trash2Icon size={24} />
          <span className="text-xl font-medium">
            Excluir
          </span>
        </button>
      </PopoverContent>

    </Popover>
  )
}