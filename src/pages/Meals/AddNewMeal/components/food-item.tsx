import { MealFood } from "@/types/types";
import { useNewMealContext } from "../context/use-meal-context";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FoodItemProps {
  foodItem: MealFood;
}

export const FoodItem = ({ foodItem: { quantity, unit, food } }: FoodItemProps) => {

  const { removeFoodFromFoodList } = useNewMealContext()

  const unitsMap: Record<MealFood['unit'], string> = {
    "GRAMS": "g",
    "MILILITERS": "ml",
    "UNITS": "u",
  }

  return (
    <li className="w-full flex justify-between items-center pb-2 border-b border-gray-300">
      <p className="w-64 font-medium text-sky-700">
        {`${quantity}${unitsMap[unit]} de ${food.name}`}
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