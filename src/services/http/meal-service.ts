import { http } from '@/services/http'
import { Meal, MealFood } from '@/types/meal-types'

const API_PREFIX = '/meals'

type CreateMealRequest = {
  id: number
  name: string
  description?: string
  foods: MealFood[]
}

export type ICreateMealService = (mealData: CreateMealRequest) => Promise<Meal>

export const createMealService: ICreateMealService = async mealData => {
  const { data } = await http.post<CreateMealRequest, Meal>(
    API_PREFIX,
    mealData,
  )

  return data
}
