import { api } from "@/services/api"

import { Food } from "@/types/types"

interface UpdateFoodParameters {
  foodId: string
  foodData: Omit<Food, "id">
}

export const updateFood = async ({ foodId, foodData }: UpdateFoodParameters) => {

  const userId = localStorage.getItem("userId")

  if (!userId) {
    return false;
  }

  const response = await api.put(`/users/${userId}/foods/${foodId}`, foodData)

  return response.status === 200
}