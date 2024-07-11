import { usePlanContext } from "@/context/plan-context";
import { useModalState } from "@/hooks/use-modal-state";

import { RoutineItem } from "./routine-item";
import { PlusCircleIcon } from "lucide-react";
import { When } from "@/components/when";
import { SelectRoutinesCard } from "./select-routines-card";

import { Routine } from "@/types/types";

interface RoutineSlotProps {
  routine: Routine | undefined
  slot: number;
}

export const RoutineSlot = ({ routine, slot }: RoutineSlotProps) => {
  const { isOpen, toggleModal } = useModalState()

  const { addRoutine, removeRoutine } = usePlanContext()

  const handleAddRoutine = (routine: Routine) => {
    addRoutine(routine, slot);
    toggleModal()
  }

  return (
    <>
      {routine ?
        (
          <RoutineItem routine={routine} onDelete={() => removeRoutine(slot)}/>
        )
        :
        (
          <li className="min-h-40 w-full flex border-4 border-gray-400 rounded-xl shadow-xl">
            <button onClick={toggleModal} className="flex-1 flex items-center justify-center gap-2">
              <PlusCircleIcon className="text-gray-400" size={32} />
              <span className="text-lg font-semibold text-gray-400">
                Selecionar uma rotina
              </span>
            </button>
          </li>
        )
      }
      <When expr={isOpen}>
        <SelectRoutinesCard onClose={toggleModal} itemsAction={handleAddRoutine} />
      </When>
    </>
  )
}
