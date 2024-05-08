import MealItem from "./meal-item";
import useFetchMealData from "@/hooks/useFetchMealData";

const MealsList = () => {

  const { mealsList } = useFetchMealData()

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
