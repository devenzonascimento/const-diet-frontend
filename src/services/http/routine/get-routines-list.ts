import { api } from "@/services/api";

import { Routine } from "@/types/types";

export const getRoutinesList = async (): Promise<Routine[]> => {

  const userId = localStorage.getItem("userId");

  const { data } = await api.get(`/users/${userId}/routines`);

  return data;
}