import { api } from "@/services/api"

interface UpdateMeal {
  mealId: string;
  mealName: string;
  foods: {
    foodId: string;
    quantity: number;
  }[];
}

export const updateMeal = async ({mealId, ...mealData}:  UpdateMeal) => {

  const userId = localStorage.getItem("userId")

  const response = await api.put(`/users/${userId}/meals/${mealId}`, mealData)

  return response.status === 200
}