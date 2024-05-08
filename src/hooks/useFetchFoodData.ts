import { Food } from "@/types/types";
import { useEffect, useState } from "react";

const useFetchFoodData = (id?: string) => {
  const [foodsList, setFoodsList] = useState<Food[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "/data/foods.json";

      const response = await fetch(url);
      const responseJSON = await response.json();

      setFoodsList(responseJSON);
    };

    fetchData();
  }, []);

  const food = id ? foodsList.find((food) => {
    return food.id === id;
  })
  :
  undefined

  return {
    food,
    foodsList,
  };
};

export default useFetchFoodData;
