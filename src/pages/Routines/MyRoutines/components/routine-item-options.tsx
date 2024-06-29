import { useRoutineContext } from "@/context/routine-context";
import { useModalState } from "@/hooks/use-modal-state";
import { useNavigate } from "react-router-dom";

import { When } from "@/components/when";
import { Edit2Icon, EllipsisVerticalIcon } from "lucide-react";
import { DeleteButton } from "./delete-button";

interface RoutineItemOptionsProps {
  routineId: string;
}

export const RoutineItemOptions = ({ routineId }: RoutineItemOptionsProps) => {

  const { isOpen, toggleModal } = useModalState()

  const navigate = useNavigate()

  const { deleteRoutineFn } = useRoutineContext()

  const handleDeleteRoutine = () => {
    deleteRoutineFn(routineId)
  }

  const handleEditRoutine = () => {
    navigate(`/edit-routine/${routineId}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={toggleModal}>
        <EllipsisVerticalIcon />
      </button>
      <When expr={isOpen}>
        <DeleteButton onDelete={handleDeleteRoutine} />
        <Edit2Icon onClick={handleEditRoutine} />
      </When>
    </div>
  );
};
