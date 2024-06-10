import { useModalState } from "@/hooks/use-modal-state";

import { MacronutrientsBadge } from "@/components/macronutrient-badges";
import { CaloriesBadge } from "@/components/calories-badge";
import { When } from "@/components/when";
import { MealFoodFormCard } from "./meal-food-form-card";

import { Food } from "@/types/types";

interface FoodItemProps {
  food: Food;
}

export const FoodItem = ({ food }: FoodItemProps) => {
  const { name, calories, ...nutrients } = food;

  const { isOpen, toggleModal } = useModalState()

  return (
    <>
      <li
        className="relative w-full flex gap-1 bg-white rounded-lg shadow-lg border-4 border-sky-700"
        onClick={toggleModal}
      >

        <div className="w-full flex flex-col justify-between gap-2 py-2 px-4">
          <h2 className="font-semibold text-gray-800">{name}</h2>
          <MacronutrientsBadge nutrients={nutrients} />
        </div>

        <CaloriesBadge className="absolute top-0 right-1" calories={calories} />

      </li>
      <When expr={isOpen}>
        <MealFoodFormCard food={food} onClose={toggleModal} />
      </When>
    </>
  );
};