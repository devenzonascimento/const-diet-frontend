import { api } from "@/services/api";
import { Food } from "@/types/types";
import { useEffect, useState } from "react";

export const useFetchFoodsList = () => {
  const [foodsList, setFoodsList] = useState<Food[]>([]);

  const fetchFoodsList = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const { data } = await api.get(`/users/${userId}/foods`);

      setFoodsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodsList();
  }, []);

  return {
    foodsList,
  };
};
