import { api } from "@/services/api"

import { DailyMealCreate } from "@/types/types";

interface UpdateRoutine {
  id: string;
  name: string;
  water: number;
  meals: DailyMealCreate[];
}

export const updateRoutine = async ({id, ...routineData}:  UpdateRoutine) => {
  if (routineData.name == "") {
    throw new Error("O nome da rotina é obrigatório!");
  }
  if (routineData.meals.length == 0) {
    throw new Error("Uma rotina precisa ter no mínimo uma refeição!");
  }

  const userId = localStorage.getItem("userId")

  const response = await api.put(`/users/${userId}/routines/${id}`, routineData)

  return response.status === 200
}