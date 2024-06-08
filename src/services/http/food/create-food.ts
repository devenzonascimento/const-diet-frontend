import { api } from "@/services/api"

import { Food } from "@/types/types"

export const createFood = async (foodData: Omit<Food, "id">) => {

  const userId = localStorage.getItem("userId")

  if (!userId) {
    return false;
  }

  const response = await api.post(`/users/${userId}/foods`, foodData)

  return response.status === 201
}