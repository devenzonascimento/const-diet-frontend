import { api } from "@/services/api";

export const deletePlan = async (planId: string) => {
  const userId = localStorage.getItem("userId");

  await api.delete(`/users/${userId}/plans/${planId}`);
};
