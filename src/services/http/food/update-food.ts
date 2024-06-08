import { api } from "@/services/api"

import { Food } from "@/types/types"

export const updateFood = async (foodData: Food) => {

  const userId = localStorage.getItem("userId")

  if (!userId) {
    return false;
  }

  const response = await api.put(`/users/${userId}/foods/${foodData.id}`, foodData)

  return response.status === 200
}