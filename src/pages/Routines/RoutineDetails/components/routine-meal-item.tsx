import { ChevronButton } from "@/components/chevron-button"
import { MealFoodItem } from "./meal-food-item"
import { List } from "@/components/list"
import { RoutineMeal } from "@/types/types"
import { useModalState } from "@/hooks/use-modal-state"

interface RoutineMealItemProps {
  routineMeal: RoutineMeal
}

export const RoutineMealItem = ({ routineMeal }: RoutineMealItemProps) => {

  const { isOpen, toggleModal } = useModalState()

  return (
    <details className="flex flex-col gap-2 bg-white border border-sky-800 rounded-lg overflow-hidden">
      <summary onClick={toggleModal} className="w-full flex items-center gap-1 px-1 py-1 bg-sky-800">
        <ChevronButton isOpen={isOpen} className="text-white" />
        <h1 className="text-lg font-semibold text-white truncate">
          {routineMeal.meal.name}
        </h1>
        <span className="ml-auto text-lg font-semibold text-white">
          {routineMeal.time}
        </span>
      </summary>
      <main className="w-full flex flex-col items-center gap-2  p-2">
        <section className="w-full flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold text-sky-950">
            Alimentos
          </h2>
          <List
            data={routineMeal.meal.foods}
            renderItem={({ item }) => {
              return <MealFoodItem
                key={routineMeal.meal.id + item.food.id}
                mealFood={item}
              />
            }}
          />
        </section>
      </main>
    </details>
  )
}
