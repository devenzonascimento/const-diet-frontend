import { api } from "@/services/api"
import { CreateFood } from "@/types/types"

export const createFood = async (foodData: CreateFood) => {

  console.log(foodData)

  const userId = localStorage.getItem("userId")

  const response = await api.post(`/users/${userId}/foods`, foodData)

  return response.status === 201
}