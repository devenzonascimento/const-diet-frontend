import { usePlanContext } from "@/context/plan-context";
import { useModalState } from "@/hooks/use-modal-state";

import { Trash2Icon, PlusCircleIcon, FlameIcon, DropletIcon } from "lucide-react";
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
          <li className="min-h-40 w-full flex border-4 border-sky-800 rounded-xl shadow-xl">
            <div className="w-full flex-1 flex flex-col gap-2 p-2">
              <header className="flex items-center gap-1">
                <h2 className="text-lg font-semibold text-sky-950 truncate">
                  {routine.name}
                </h2>
                <button
                  onClick={() => removeRoutine(slot)}
                  className="ml-auto bg-red-500 p-1 rounded-lg"
                >
                  <Trash2Icon className="text-white" />
                </button>
              </header>
              <main className="flex flex-col gap-4">
                <section className="flex justify-between gap-4">
                  <div
                    className="flex-1 flex flex-col items-center justify-cente overflow-auto"
                  >
                    <div className="w-full flex items-center justify-center gap-1 p-1 border-2 border-sky-800 rounded-t-xl">
                      <span className=" text-sky-950 font-semibold">Calorias</span>
                      <FlameIcon size={18} className="text-sky-800" />
                    </div>
                    <p className="w-full flex items-center justify-center font-semibold p-1 bg-sky-800 text-white rounded-b-xl">
                      {routine.totalCalories.toFixed()}
                      <span className="text-xs">kcal</span>
                    </p>
                  </div>
                  <div
                    className="flex-1 flex flex-col items-center justify-cente overflow-auto"
                  >
                    <div className="w-full flex items-center justify-center gap-1 p-1 border-2 border-sky-800 rounded-t-xl">
                      <span className=" text-sky-950 font-semibold">Agua</span>
                      <DropletIcon size={18} className="text-sky-800" />
                    </div>
                    <p className="w-full flex items-center justify-center font-semibold p-1 bg-sky-800 text-white rounded-b-xl">
                      {routine.water}
                      <span className="text-xs">ml</span>
                    </p>
                  </div>
                </section>
                <ul className="flex items-center justify-around gap-1 ">
                  <li className="min-w-12 flex justify-center text-xs font-medium text-white bg-sky-800 p-1 rounded-lg">
                    C {routine.totalCarbohydrates.toFixed()}g
                  </li>
                  <li className="min-w-12 flex justify-center text-xs font-medium text-white bg-sky-800 p-1 rounded-lg">
                    P {routine.totalProteins.toFixed()}g
                  </li>
                  <li className="min-w-12 flex justify-center text-xs font-medium text-white bg-sky-800 p-1 rounded-lg">
                    G {routine.totalFats.toFixed()}g
                  </li>
                  <li className="min-w-12 flex justify-center text-xs font-medium text-white bg-sky-800 p-1 rounded-lg">
                    S {routine.totalSodiums.toFixed(3)}g
                  </li>
                  <li className="min-w-12 flex justify-center text-xs font-medium text-white bg-sky-800 p-1 rounded-lg">
                    F {routine.totalFibers.toFixed()}g
                  </li>
                </ul>
              </main>
            </div>
          </li>
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
