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

  if (mealData.name == "") {
    throw new Error ("O nome da refeição é obrigatório!")
  }
  if (mealData.foods.length == 0) {
    throw new Error ("Uma refeição precisa ter no mínimo um alimento!")
  }

  const userId = localStorage.getItem("userId")

  const response = await api.post(`/users/${userId}/meals`, mealData)

  return response.status === 201
}