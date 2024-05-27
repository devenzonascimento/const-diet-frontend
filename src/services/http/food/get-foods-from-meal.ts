import { api } from "@/services/api";
import { MealFood } from "@/types/types";

export const getFoodsFromMeal = async (mealId: string): Promise<MealFood[]> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/meals/${mealId}/foods`);

  return data;
}