import { api } from "@/services/api";
import { Meal } from "@/types/types";

export const getMeal= async (mealId: string): Promise<Meal> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/meals/${mealId}`);

  return data;
}