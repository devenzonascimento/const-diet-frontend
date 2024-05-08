import FoodItem from "./food-item";
import useFetchFoodData from "@/hooks/useFetchFoodData";

const FoodsList = () => {
  const { foodsList } = useFetchFoodData();

  return (
    <ul className="w-full flex flex-col gap-6">
      {foodsList.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </ul>
  );
};

export default FoodsList;
