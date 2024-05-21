import { api } from "@/services/api";
import { Food } from "@/types/types";
import { useEffect, useState } from "react";

export const useFetchFood = (foodId: string = "") => {
  const [food, setFood] = useState<Food>();

  const fetchFood = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !foodId) return;

      const { data } = await api.get(`/users/${userId}/foods/${foodId}`);

      setFood(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return {
    food,
  };
};