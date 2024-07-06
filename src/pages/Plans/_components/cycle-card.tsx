import { usePlanContext } from "@/context/plan-context";
import { useEffect } from "react";


import { ModalBackdrop } from "@/components/modal-backdrop";
import { List } from "@/components/list";
import { RoutineSlot } from "./routine-slot";

interface CycleCardProps {
  title: string;
  description?: string;
  numberOfSlots?: number;
  isCustom?: boolean
  onClose: () => void;
}

export const CycleCard = ({
  title,
  description,
  numberOfSlots = 1,
  onClose
}: CycleCardProps) => {

  const { routinesCycle, setRoutinesCycle } = usePlanContext()

  useEffect(() => {
    setRoutinesCycle([
      {
        id: "123c",
        name: "Rotina para testes",
        water: 3750,
        totalCalories: 3250,
        totalCarbohydrates: 225,
        totalProteins: 180,
        totalFats: 80,
        totalSodiums: 1,
        totalFibers: 10,
        meals: []
      }
    ])
    //setRoutinesCycle(Array.from({ length: numberOfSlots }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ModalBackdrop onClose={onClose} >
        <div
          className="h-[70%] w-[90%] flex flex-col gap-2 items-center p-2 bg-white border-4 border-sky-400 rounded-xl"
        >
          <h1 className="font-semibold text-lg text-sky-950">{title}</h1>
          <p className="text-sm text-slate-500">{description}</p>
          <List
            data={routinesCycle}
            renderItem={({ item, index }) =>
              <RoutineSlot key={index} routine={item} slot={index} />
            }
          />
        </div>
      </ModalBackdrop>
    </>
  )
}
