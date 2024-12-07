import { http } from '@/services/http'
import { Food } from '@/types/types'

const API_PREFIX = '/foods'

type AddFoodRequest = Food

type AddFoodResponse = Food

export type IAddFoodService = (food: AddFoodRequest) => Promise<AddFoodResponse>

export const addFoodService: IAddFoodService = async (food: AddFoodRequest) => {
  const { data } = await http.post<AddFoodRequest, AddFoodResponse>(
    `${API_PREFIX}`,
    food,
    {},
  )

  return data
}
