import { api } from "@/services/api";
import { Meal } from "@/types/types";

export const getMealsList = async (): Promise<Meal[]> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/meals`);

  return data;
}