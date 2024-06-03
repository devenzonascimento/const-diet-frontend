import { MealItem } from "./meal-item";
import { useQuery } from "@tanstack/react-query";
import { getMealsList } from "@/services/http/meal/get-meals-list";
import { Skeleton } from "@/components/ui/skeleton";

export const MealsList = () => {

  const { data: mealsList, isPending } = useQuery({
    queryKey: ["mealsList"],
    queryFn: getMealsList,
    refetchInterval: 1000,
    refetchOnMount: false,
  })

  const loadingElemntsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  if (isPending) {
    return (
      <ul className="w-full flex flex-col gap-6">
        {loadingElemntsArray?.map(() => (
          <Skeleton className="w-full h-16 flex flex-col gap-2 bg-white rounded-xl shadow-xl border-4 border-sky-700"></Skeleton>
        ))}
      </ul>
    )
  }

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

