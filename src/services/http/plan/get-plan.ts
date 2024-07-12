import { api } from "@/services/api";

import { Plan } from "@/types/types";

export const getPlan = async (planId: string): Promise<Plan> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/plans/${planId}`);

  return data;
}