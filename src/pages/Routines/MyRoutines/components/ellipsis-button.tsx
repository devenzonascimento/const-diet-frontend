import { useModalState } from "@/hooks/use-modal-state";

import { cn } from "@/lib/utils";
import { deleteRoutine } from "@/services/http/routine/delete-routine";

import { When } from "@/components/when";
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";

interface EllipsisButtonProps {
  routineId: string;
  className?: string;
}

export const EllipsisButton = ({ routineId, className }: EllipsisButtonProps) => {

  const { isOpen, toggleModal } = useModalState()

  const handleDeleteRoutine = () => {
    deleteRoutine(routineId)
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={toggleModal} className={cn(className)}>
        <EllipsisVerticalIcon />
      </button>
      <When expr={isOpen}>
        <Trash2Icon onClick={handleDeleteRoutine}/>
        <Edit2Icon />
      </When>
    </div>
  );
};