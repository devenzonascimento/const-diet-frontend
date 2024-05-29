import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useToggleState from "@/hooks/useToggleState";

import { getFoodsFromMeal } from "@/services/http/food/get-foods-from-meal";
import { calculateTotalCalories } from "@/functions/calculate-total-calories";

import { MealDescription } from "./meal-description";
import { ChevronButton } from "./chevron-button";

import { Meal } from "@/types/types";
import CaloriesBadge from "@/components/calories-badge";
import { deleteMeal } from "@/services/http/meal/delete-meal";

interface MealItemProps {
  meal: Meal;
}

export const MealItem = ({ meal: { id, name } }: MealItemProps) => {

  const { booleanExp, toggleBooleanExp } = useToggleState();

  const { data: foods } = useQuery({
    queryKey: [`foodsFromMeal-${id}`],
    queryFn: () => getFoodsFromMeal(id),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: deleteMealFn } = useMutation({
    mutationFn: deleteMeal,
    onSuccess() {
      queryClient.setQueryData(
        ["mealsList"],
        (data: Meal[]) => data.filter((meal) => (meal.id !== id))
      )
    },
  })

  const handleDeleteMeal = () => {
    deleteMealFn(id)
  }

  return (
    <li
      className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <div className=" w-full flex gap-4 items-center p-2" onClick={toggleBooleanExp}>
        <ChevronButton isOpen={booleanExp} />
        <h2 className=" w-full text-lg uppercase font-semibold text-sky-700">
          {name}
        </h2>
        <CaloriesBadge calories={calculateTotalCalories(foods)} />
      </div>
      <MealDescription isOpen={booleanExp} foods={foods} deleteMeal={handleDeleteMeal} />
    </li>
  );
};


