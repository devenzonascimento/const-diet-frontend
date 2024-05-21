import { api } from "@/services/api"
import { Food } from "@/types/types"

export const createFood = async (foodData: Food) => {

  console.log(foodData)

  const userId = localStorage.getItem("userId")

  const response = await api.post(`/users/${userId}/foods`, foodData)

  return response.status === 201
}