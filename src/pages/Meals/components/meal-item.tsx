import useToggleState from "@/hooks/useToggleState";

import MealDescription from "./meal-description";
import ChevronButton from "./chevron-button";

import { Meal } from "@/types/types";

interface MealItemProps {
  meal: Meal;
}

const MealItem = ({ meal }: MealItemProps) => {
  const { name, foods } = meal;

  const { booleanExp, toggleBooleanExp } = useToggleState();

  return (
    <li
      className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"
    >
      <div className=" w-full flex gap-4 items-center p-2" onClick={toggleBooleanExp}>
        <ChevronButton isOpen={booleanExp} />
        <h2 className=" w-fit text-xl uppercase font-semibold text-sky-700 text-center">
          {name}
        </h2>
      </div>
      <MealDescription foods={foods} isOpen={booleanExp} />
    </li>
  );
};

export default MealItem;
