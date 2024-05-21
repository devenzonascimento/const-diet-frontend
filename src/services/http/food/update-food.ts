import { api } from "@/services/api"
import { Food } from "@/types/types"

export const updateFood = async (foodData: Food, foodId: string = "") => {
  const userId = localStorage.getItem("userId")

  const response = await api.put(`/users/${userId}/foods/${foodId}`, foodData)

  return response.status === 201
}