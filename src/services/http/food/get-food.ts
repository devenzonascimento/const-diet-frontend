import { api } from "@/services/api";
import { Food } from "@/types/types";

export const getFood = async (foodId: string): Promise<Food> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/foods/${foodId}`);

  return data;
}