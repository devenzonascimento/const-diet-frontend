import { useQuery } from "@tanstack/react-query";
import useToggleState from "@/hooks/useToggleState";

import { getFoodsFromMeal } from "@/services/http/food/get-foods-from-meal";

import { MealDescription } from "./meal-description";
import { ChevronButton } from "./chevron-button";

import { Meal } from "@/types/types";

interface MealItemProps {
  meal: Meal;
}

export const MealItem = ({ meal: { id, name }}: MealItemProps) => {

  const { data: foodsFromMeal } = useQuery({
    queryKey: ["foodsFromMealList"],
    queryFn: () => getFoodsFromMeal(id),
  })

  const { booleanExp, toggleBooleanExp } = useToggleState();

  return (
    <li
      className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <div className=" w-full flex gap-4 items-center p-2" onClick={toggleBooleanExp}>
        <ChevronButton isOpen={booleanExp} />
        <h2 className=" w-60 text-xl uppercase font-semibold text-sky-700 text-center">
          {name}
        </h2>
      </div>
      <MealDescription foods={foodsFromMeal} isOpen={booleanExp} />
    </li>
  );
};
