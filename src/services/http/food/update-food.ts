import { api } from "@/services/api"
import { CreateFood } from "@/types/types"

interface UpdateFoodParameters {
  foodId: string
  foodData: CreateFood
}

export const updateFood = async ({ foodId, foodData }: UpdateFoodParameters) => {
  const userId = localStorage.getItem("userId")

  const response = await api.put(`/users/${userId}/foods/${foodId}`, foodData)

  return response.status === 201
}