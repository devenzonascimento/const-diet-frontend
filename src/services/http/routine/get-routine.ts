import { api } from "@/services/api";

import { Routine } from "@/types/types";

export const getRoutine = async (routineId: string): Promise<Routine> => {
  try {
    const userId = localStorage.getItem("userId");
  
    const { data } = await api.get(`/users/${userId}/routines/${routineId}`);
  
    return data;
  } catch (error) {
    console.error(error);
    return {} as Routine
  }
}