import MacronutrientsBadge from "@/components/macronutrient-badges";
import { useState } from "react";
import FoodCardModal from "./food-card-modal";
import When from "@/components/when";
import CaloriesBadge from "@/components/calories-badge";

interface FoodItemProps {
  food: Food;
}

const FoodItem = ({ food }: FoodItemProps) => {
  const { image, name, calories, nutrients } = food;

  const [isFoodCardOpen, setIsFoodCardOpen] = useState(false);

  const handleToggleCard = () => {
    setIsFoodCardOpen(!isFoodCardOpen);

    return;
  };

  return (
    <>
      <li
        className="relative w-full flex gap-1 bg-white rounded-lg shadow-lg border-4 border-sky-700"
        onClick={handleToggleCard}
      >
        <div className="h-20 aspect-square flex items-start border-r-4 border-sky-700 ">
          <img
            className="h-full  aspect-square object-cover rounded-l-md shadow-xl"
            src={image}
            alt="food"
          />
        </div>
        <div className="w-full flex flex-col justify-between p-2">
          <h2 className="font-semibold text-gray-800">{name}</h2>
          <MacronutrientsBadge nutrients={nutrients} />
        </div>
        
        <CaloriesBadge className="absolute top-0 right-1" calories={calories} />
   
      </li>
      <When expr={isFoodCardOpen}>
        <FoodCardModal food={food} onClose={handleToggleCard}/>
      </When>
    </>
  );
};

export default FoodItem;
