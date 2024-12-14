import { http } from '@/services/http'
import { Food } from '@/types/food-types'

const API_PREFIX = '/foods'

export type IAddFoodService = (food: Food) => Promise<Food>

export const addFoodService: IAddFoodService = async (food: Food) => {
  const { data } = await http.post<Food, Food>(API_PREFIX, food)

  return data
}

export type IGetFoodListService = () => Promise<Food[]>

export const getFoodListService: IGetFoodListService = async () => {
  const { data } = await http.get<Food[]>(API_PREFIX)

  return data
}

export type IGetFoodByIdService = (foodId: number) => Promise<Food>

export const getFoodByIdService: IGetFoodByIdService = async (foodId) => {
  const { data } = await http.get<Food>(`${API_PREFIX}/${foodId}`)

  return data
}

export type IDeleteFoodService = (foodId: number) => Promise<void>

export const deleteFoodService: IDeleteFoodService = async foodId => {
  await http.delete(`${API_PREFIX}/${foodId}`)
}
