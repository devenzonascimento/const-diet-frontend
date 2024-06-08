import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggleState } from "@/hooks/use-toggle-state";

import { deleteMeal } from "@/services/http/meal/delete-meal";
import { calculateTotalCalories } from "@/functions/calculate-total-calories";

import { ChevronButton } from "./chevron-button";
import { CaloriesBadge } from "@/components/calories-badge";
import { MealDescription } from "./meal-description";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";

import { Meal } from "@/types/types";
import { useModalState } from "@/hooks/use-modal-state";
import { MealDetails } from "./meal-details";
import { When } from "@/components/when";

interface MealItemProps {
  meal: Meal;
}

export const MealItem = ({ meal }: MealItemProps) => {

  const { booleanExp, toggleBooleanExp } = useToggleState();
  const { isOpen, toggleModal } = useModalState()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteMealFn } = useMutation({
    mutationFn: deleteMeal,
    onSuccess() {
      queryClient.setQueryData(
        ["mealsList"],
        (data: Meal[]) => data.filter((mealItem) => (mealItem.id !== meal.id))
      )
    },
  })

  return (
    <li
      className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <div className=" w-full flex gap-2 items-center py-2 px-1" onClick={toggleBooleanExp}>
        <ChevronButton isOpen={booleanExp} />
        <h2 className=" w-full text-lg font-semibold text-sky-700">
          {meal.name}
        </h2>
        <CaloriesBadge calories={calculateTotalCalories(meal.foods)} />
      </div>

      <div
        style={{ display: booleanExp ? "flex" : "none" }}
        className="flex flex-col gap-2 p-4 border-t-2 border-gray-300"
      >
        <MealDescription foods={meal.foods} />

        <Button className="w-full bg-white text-sky-700 border-2 border-sky-700"
          onClick={toggleModal}
        >
          Ver mais detalhes
        </Button>

        <When expr={isOpen}>

          <MealDetails meal={meal} onClose={toggleModal} />
        </When>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/edit-meal/${meal.id}`}>
            <Button className="w-full bg-sky-700 hover:bg-sky-500" >
              Editar refeição
            </Button>
          </Link>
          <DeleteButton onDelete={() => deleteMealFn(meal.id)} />
        </div>
      </div>
    </li>
  );
};


