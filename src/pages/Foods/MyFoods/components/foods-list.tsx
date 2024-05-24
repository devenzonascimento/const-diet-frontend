import FoodItem from "./food-item";
import { useQuery } from "@tanstack/react-query";
import { getFoodsList } from "@/services/http/food/get-foods-list";

const FoodsList = () => {

  const { data: foodsList} = useQuery({
    queryKey: ["foodsList"],
    queryFn: getFoodsList,
  })

  return (
    <ul className="w-full flex flex-col gap-6">
      {foodsList?.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </ul>
  );
};

export default FoodsList;
