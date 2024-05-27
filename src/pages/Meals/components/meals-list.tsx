import { MealItem } from "./meal-item";
import { useQuery } from "@tanstack/react-query";
import { getMealsList } from "@/services/http/meal/get-meals-list";

const MealsList = () => {

  const { data: mealsList } = useQuery({
    queryKey: ["mealsList"],
    queryFn: getMealsList,
  })

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
