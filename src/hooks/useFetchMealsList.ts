import { api } from "@/services/api";
import { Meal } from "@/types/types";
import { useEffect, useState } from "react";

export const useFetchMealsList = () => {
  const [mealsList, setMealsList] = useState<Meal[]>([]);

  const fetchMealsList = async () => {
    const userId = localStorage.getItem("userId");

    const { data } = await api.get(`/users/${userId}/meals`);
    console.log(data);
    setMealsList(data);
  };

  useEffect(() => {
    fetchMealsList();
  }, []);

  return {
    mealsList,
  };
};
