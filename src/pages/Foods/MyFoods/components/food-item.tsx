import { MacronutrientsBadge } from "@/components/macronutrient-badges";
import { FoodCardModal } from "./food-card-modal";
import { When } from "@/components/when";
import { CaloriesBadge } from "@/components/calories-badge";
import { useModalState } from "@/hooks/use-modal-state";

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
        <div className="h-20 aspect-square flex items-start border-r-4 border-sky-700 ">
          <img
            className="h-full  aspect-square object-cover rounded-l-md shadow-xl"
            src="/assets/strawberry.jpg"
            alt="food"
          />
        </div>
        <div className="w-full flex flex-col justify-between p-2">
          <h2 className="font-semibold text-gray-800">{name}</h2>
          <MacronutrientsBadge nutrients={nutrients} />
        </div>

        <CaloriesBadge className="absolute top-0 right-1" calories={calories} />

      </li>
      <When expr={isOpen}>
        <FoodCardModal food={food} onClose={toggleModal} />
      </When>
    </>
  );
};
