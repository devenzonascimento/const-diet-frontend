import { api } from "@/services/api"
import { CreateFood } from "@/types/types"

export const updateFood = async (foodData: CreateFood, foodId: string = "") => {
  const userId = localStorage.getItem("userId")

  const response = await api.put(`/users/${userId}/foods/${foodId}`, foodData)

  return response.status === 201
}