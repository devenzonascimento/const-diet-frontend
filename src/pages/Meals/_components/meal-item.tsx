import { useToggleState } from "@/hooks/use-toggle-state";

import { MealDescription } from "./meal-description";

import { CaloriesBadge } from "@/components/calories-badge";

import { Meal } from "@/types/types";
import { ChevronButton } from "@/components/chevron-button";

interface MealItemProps {
  meal: Meal;
}

export const MealItem = ({ meal }: MealItemProps) => {

  const { booleanExp, toggleBooleanExp } = useToggleState();

  return (
    <li
      className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <div className=" w-full flex gap-4 items-center p-2" onClick={toggleBooleanExp}>
        <ChevronButton isOpen={booleanExp} />
        <h2 className=" w-full text-xl uppercase font-semibold text-sky-700">
          {meal.name}
        </h2>
        <CaloriesBadge calories={meal.calories} />
      </div>
      <MealDescription foods={meal.foods} isOpen={booleanExp} />
    </li>
  );
};


