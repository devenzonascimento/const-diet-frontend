import { useState } from "react"
import { useRoutineContext } from "@/context/routine-context"

import { ModalBackdrop } from "@/components/modal-backdrop";
import { TimeInput } from "@/components/time-input"
import { Button } from "@/components/ui/button";

import { Meal } from "@/types/types";

interface RoutineMealFormCardProps {
  meal: Meal;
  onClose: () => void;
}

export const RoutineMealFormCard = ({ meal, onClose }: RoutineMealFormCardProps) => {

  const [time, setTime] = useState<string>("")

  const { addMeal } = useRoutineContext()

  const handleAddMeal = () => {
    addMeal({
      meal,
      time: time,
    })

    onClose()
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-lg">
        <h2 className="text-xl font-semibold text-center">
          Qual horário você vai comer {meal.name}?
        </h2>
        <TimeInput setTime={setTime} />
        <Button
          onClick={handleAddMeal}
          className="w-full bg-sky-700 hover:bg-sky-500"
        >
          Adicionar refeição
        </Button>
      </div>
    </ModalBackdrop>
  );
};