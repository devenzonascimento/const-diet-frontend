import { usePlanContext } from "@/context/plan-context";
import { useModalState } from "@/hooks/use-modal-state";

import { Trash2Icon, PlusCircleIcon } from "lucide-react";
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
      <section className="min-h-40 w-full flex border-4 border-gray-400 rounded-xl">
        {routine ?
          (
            <div className="flex-1 flex-col gap-2 p-2">
              <header className="flex items-center">
                <h2>{routine.name}</h2>
                <button onClick={() => removeRoutine(slot)} className="ml-auto">
                  <Trash2Icon />
                </button>
              </header>

            </div>
          )
          :
          (
            <button onClick={toggleModal} className="flex-1 flex items-center justify-center gap-2">
              <PlusCircleIcon className="text-gray-400" size={32} />
              <span className="text-lg font-semibold text-gray-400">
                Selecionar uma rotina
              </span>
            </button>
          )
        }
      </section>
      <When expr={isOpen}>
        <SelectRoutinesCard onClose={toggleModal} itemsAction={handleAddRoutine} />
      </When>
    </>
  )
}
