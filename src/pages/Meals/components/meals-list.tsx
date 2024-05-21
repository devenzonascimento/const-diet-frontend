import { useFetchMealsList } from "@/hooks/useFetchMealsList";
import MealItem from "./meal-item";

const MealsList = () => {

  const { mealsList } = useFetchMealsList()

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
