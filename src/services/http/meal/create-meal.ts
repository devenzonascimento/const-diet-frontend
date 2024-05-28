import { api } from "@/services/api"

interface CreateMeal {
  name: string;
  foods: {
    foodId: string;
    quantity: number;
    unit: string;
  }[];
}

export const createMeal = async (mealData: CreateMeal) => {

  const userId = localStorage.getItem("userId")

  const response = await api.post(`/users/${userId}/meals`, mealData)

  return response.status === 201
}