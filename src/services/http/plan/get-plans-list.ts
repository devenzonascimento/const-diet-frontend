import { api } from "@/services/api";

import { Plan } from "@/types/types";

export const getPlansList = async (): Promise<Plan[]> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/plans`);

  return data;
}