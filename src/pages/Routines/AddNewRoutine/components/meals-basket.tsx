import { Button } from "@/components/ui/button"

import { Plus, PlusCircle } from "lucide-react"

import { DailyMeal } from "@/types/types"

interface MealsBasketProps {
  meals: DailyMeal[]
  openCardToSelectMeals: VoidFunction
}

export const MealsBasket = ({ meals, openCardToSelectMeals }: MealsBasketProps) => {
  return (
    <div
      className="h-full w-full flex flex-col justify-between gap-2 p-2 border-4 border-sky-900 rounded-md  overflow-auto"
    >
      {meals.length > 0
        ?
        (
          <>
            <ul className="w-full flex flex-col gap-2 overflow-auto">
              {meals?.map(mealItem => <li key={mealItem.meal.id}>{mealItem.meal.name} as {mealItem.time}</li>)}
            </ul>
            <Button
              onClick={openCardToSelectMeals}
              className="w-full flex gap-2 mt-4 text-sky-700 bg-slate-50 border-2 border-sky-700"
            >
              <Plus />
              <span className="text-base">Adicionar refeição</span>
            </Button>
          </>
        )
        :
        (
          <div
            className="h-full w-full flex justify-center items-center gap-2"
            onClick={openCardToSelectMeals}
          >
            <PlusCircle size={32} className="text-gray-500" />
            <span className="text-gray-500 text-lg font-semibold">Adicionar refeição</span>
          </div>
        )
      }
    </div>
  )
}
