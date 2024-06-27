import { Button } from "@/components/ui/button"

import { Plus, PlusCircle } from "lucide-react"

import { DailyMeal } from "@/types/types"

interface MealsBasketProps {
  meals: DailyMeal[]
  openCardToSelectMeals: VoidFunction
}

export const MealsBasket = ({ meals, openCardToSelectMeals }: MealsBasketProps) => {
  return (
    <>
      {meals.length > 0
        ?
        (
          <ul className="w-full h-full overflow-auto flex flex-col gap-2 p-2">
            {meals?.map(mealItem => <li key={mealItem.meal.id}>{mealItem.meal.name} as {mealItem.time}</li>)}
            <Button
              className="w-full flex gap-2 mt-4 text-sky-700 bg-slate-50 border-2 border-sky-700"
              onClick={openCardToSelectMeals}
            >
              <Plus />
              <span className="text-base">Adicionar refeição</span>
            </Button>
          </ul>
        )
        :
        (
          <div
            className="min-h-32 w-full flex justify-center items-center gap-2"
            onClick={openCardToSelectMeals}
          >
            <PlusCircle size={32} className="text-gray-500" />
            <span className="text-gray-500 text-lg font-semibold">Adicionar refeição</span>
          </div>
        )
      }
    </>
  )
}