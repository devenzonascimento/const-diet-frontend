import { useEffect, useState } from "react";

const useFetchMealData = (id?: string) => {
  const [mealsList, setMealsList] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/data/meals.json";

      const response = await fetch(url);
      const responseJSON = await response.json();

      setMealsList(responseJSON);
    };

    fetchData();
  }, []);

  const meal = id ? mealsList.find((meal) => {
    return meal.id === id;
  })
  :
  undefined

  return {
    meal,
    mealsList,
  };
};

export default useFetchMealData;
