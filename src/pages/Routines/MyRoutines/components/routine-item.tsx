import { useModalState } from "@/hooks/use-modal-state"

import { ChevronButton } from "@/components/chevron-button"
import { FlameIcon, DropletIcon } from "lucide-react"
import { NutrientBadge } from "./nutrient-badge"
import { List } from "@/components/list"
import { RoutineMealItem } from "./routine-meal-item"

import { Routine } from "@/types/types"
import { RoutineItemOptions } from "./routine-item-options"


interface RoutineItemProps {
  routine: Routine
}

export const RoutineItem = ({ routine }: RoutineItemProps) => {
  const { isOpen, toggleModal } = useModalState()

  return (
    <li
      className="h-fit w-full flex flex-col gap-4 items-center bg-sky-600 rounded-xl shadow-xl overflow-hidden"
    >
      <header
        className="w-full p-2 flex items-center justify-between text-white bg-sky-700"
      >
        <ChevronButton onClick={toggleModal} isOpen={isOpen} />
        <h2 onClick={toggleModal} className="w-4/5 text-center text-lg">
          {routine.name}
        </h2>
        <RoutineItemOptions routineId={routine.id} />
      </header>

      {isOpen && (
        <div className="w-full flex flex-col gap-4 p-2">
          <div className="w-full flex justify-between">
            <div className="h-36 w-36 flex flex-col gap-1 items-center justify-center bg-sky-500 border-2 border-white rounded-full">
              <FlameIcon strokeWidth={1} className="text-white fill-white" size={64} />
              <p className="mb-3 font- text-white">
                <span className="text-2xl">{routine.totalCalories.toFixed()}</span>
                <span>kcal</span>
              </p>
            </div>
            <div className="h-36 w-36 flex flex-col gap-1 items-center justify-center bg-sky-500 border-2 border-white rounded-full">
              <DropletIcon strokeWidth={1} className="text-white fill-white" size={64} />
              <p className="mb-3 font- text-white">
                <span className="text-2xl">{routine.water}</span>
                <span>ml</span>
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-6 gap-2">
            <NutrientBadge
              title="Carboidratos"
              value={routine.totalCarbohydrates.toFixed()}
              className="col-span-3"
            />
            <NutrientBadge
              title="Proteínas"
              value={routine.totalProteins.toFixed()}
              className="col-span-3"
            />
            <NutrientBadge
              title="Gorduras"
              value={routine.totalFats.toFixed()}
              className="col-span-2"
            />
            <NutrientBadge
              title="Sódio"
              value={routine.totalSodiums.toFixed()}
              className="col-span-2"
            />
            <NutrientBadge
              title="Fibras"
              value={routine.totalFibers.toFixed()}
              className="col-span-2"
            />
          </div>
          <p className="w-full text-white text-xl font-medium text-center">Suas refeições</p>
          <List
            data={routine.meals}
            renderItem={({ item }) => <RoutineMealItem key={item.meal.id} routineMeal={item} />}
          />
        </div>
      )}
    </li>
  )
}
