import { useMealContext } from "@/context/meal-context";

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import { Food, MealFood } from "@/types/types";

interface FoodItemProps {
  foodItem: MealFood;
}

export const BasketItem = ({ foodItem: { quantity, food } }: FoodItemProps) => {

  const { removeFoodFromFoodList } = useMealContext()

  const UNIT: Record<Food['unit'], string> = {
    "GRAMS": "g",
    "MILILITERS": "ml",
  }

  return (
    <li className="w-full flex justify-between items-center pb-2 border-b border-gray-300">
      <p className="w-64 font-medium text-sky-700">
        {`${quantity}${UNIT[food.unit]} de ${food.name}`}
      </p>
      <Button
        size={"icon"}
        className="bg-red-600"
        onClick={() => removeFoodFromFoodList(food.id)}
      >
        <Trash2 size={24} />
      </Button>
    </li>
  )
}