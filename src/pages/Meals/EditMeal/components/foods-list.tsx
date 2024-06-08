import { useMealContext } from "@/context/meal-context"

import { FoodItem } from "./food-item"
import { Button } from "@/components/ui/button"

import { Plus, PlusCircle } from "lucide-react"

interface FoodsListProps {
  openFormModal: VoidFunction
}

export const FoodsList = ({ openFormModal }: FoodsListProps) => {

  const { foods } = useMealContext()

  return (
    <>
      {foods.length > 0
        ?
        (
          <ul className="w-full h-full overflow-auto flex flex-col gap-2 p-2">
            {foods.map((food) => (
              <FoodItem key={food.food.id} foodItem={food} />
            ))
            }
            <Button
              className="w-full flex gap-2 mt-4 text-sky-700 bg-slate-50 border-2 border-sky-700"
              onClick={openFormModal}
            >
              <Plus />
              <span className="text-base">Adicionar alimento</span>
            </Button>
          </ul>
        )
        :
        (
          <div
            className="min-h-32 w-full flex justify-center items-center gap-2"
            onClick={openFormModal}
          >
            <PlusCircle size={32} className="text-gray-500" />
            <span className="text-gray-500 text-lg font-semibold">Adicionar alimento</span>
          </div>
        )
      }
    </>
  )
}

