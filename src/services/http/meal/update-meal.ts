import { api } from "@/services/api"
import { Meal } from "@/types/types";

interface UpdateMeal {
  mealId: string;
  name: string;
  foods: {
    foodId: string;
    quantity: number;
  }[];
}

export const updateMeal = async ({mealId, ...mealData}:  UpdateMeal): Promise<Meal> => {

  if (mealData.name == "") {
    throw new Error ("O nome da refeição é obrigatório!")
  }
  if (mealData.foods.length == 0) {
    throw new Error ("Uma refeição precisa ter no mínimo um alimento!")
  }

  const userId = localStorage.getItem("userId")

  const { data } = await api.put(`/users/${userId}/meals/${mealId}`, mealData)

  return data
}