import { useFetchFoodsList } from "@/hooks/useFetchFoodsList";
import FoodItem from "./food-item";


const FoodsList = () => {
  const { foodsList } = useFetchFoodsList();

  return (
    <ul className="w-full flex flex-col gap-6">
      {foodsList.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </ul>
  );
};

export default FoodsList;
