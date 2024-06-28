import { api } from "@/services/api";

import { DailyMealCreate } from "@/types/types";

interface CreateRoutine {
  name: string;
  water: number;
  meals: DailyMealCreate[];
}

export const createRoutine = async (routineData: CreateRoutine) => {
  if (routineData.name == "") {
    throw new Error("O nome da rotina é obrigatório!");
  }
  if (routineData.meals.length == 0) {
    throw new Error("Uma rotina precisa ter no mínimo uma refeição!");
  }

  const userId = localStorage.getItem("userId");

  await api.post(`/users/${userId}/routines`, routineData);

  return;
};
