import { api } from "@/services/api";

export const deleteRoutine = async (routineId: string) => {
  const userId = localStorage.getItem("userId");

  const response = await api.delete(`/users/${userId}/routines/${routineId}`);

  return response.status === 204;
};
