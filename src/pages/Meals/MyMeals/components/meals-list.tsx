import { useQuery } from "@tanstack/react-query";

import { getMealsList } from "@/services/http/meal/get-meals-list";

import { MealsListLoading } from "./meals-list-loading";
import { MealItem } from "./meal-item";

export const MealsList = () => {

  const { data: mealsList, isPending } = useQuery({
    queryKey: ["mealsList"],
    queryFn: getMealsList,
    refetchInterval: 1000,
    refetchOnMount: false,
  })

  if (isPending) {
    return <MealsListLoading />
  }

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

