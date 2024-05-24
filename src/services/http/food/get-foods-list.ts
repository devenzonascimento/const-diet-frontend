import { api } from "@/services/api";
import { Food } from "@/types/types";

export const getFoodsList = async (): Promise<Food[]> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/foods`);

  return data;
}