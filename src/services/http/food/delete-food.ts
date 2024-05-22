import { api } from "@/services/api"

export const deleteFood = async (foodId: string) => {

  const userId = localStorage.getItem("userId")

  const response = await api.delete(`/users/${userId}/foods/${foodId}`)

  return response.status === 204
}