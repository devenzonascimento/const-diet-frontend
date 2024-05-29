import { api } from "@/services/api"

export const deleteMeal = async (mealId: string) => {

  const userId = localStorage.getItem("userId")

  const response = await api.delete(`/users/${userId}/meals/${mealId}`)

  return response.status === 204
}