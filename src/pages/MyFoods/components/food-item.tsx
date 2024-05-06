import { Flame } from "lucide-react";
import MacronutrientsBadge from "./macronutrient-badges";

interface FoodItemProps {
  food: Food;
}

const FoodItem = ({ food }: FoodItemProps) => {
  const { image, name, calories, nutrients } = food;

  return (
    <li className="relative w-full flex gap-1 bg-white rounded-lg shadow-lg border-4 border-sky-700">
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

      <div className="absolute top-1 right-2 flex items-center gap-1 text-gray-800 font-semibold">
        <Flame className="text-red-600 fill-yellow-500" size={20} />
        <p className="pt-1">{calories}</p>
      </div>
    </li>
  );
};

export default FoodItem;
