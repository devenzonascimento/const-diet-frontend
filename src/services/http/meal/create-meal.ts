import { api } from "@/services/api"

import { Meal } from "@/types/types";

interface CreateMeal {
  name: string;
  foods: {
    foodId: string;
    quantity: number;
  }[];
}

export const createMeal = async (mealData: CreateMeal): Promise<Meal> => {

  if (mealData.name == "") {
    throw new Error ("O nome da refeição é obrigatório!")
  }
  if (mealData.foods.length == 0) {
    throw new Error ("Uma refeição precisa ter no mínimo um alimento!")
  }

  const userId = localStorage.getItem("userId")

  const { data } = await api.post(`/users/${userId}/meals`, mealData)

  return data
}