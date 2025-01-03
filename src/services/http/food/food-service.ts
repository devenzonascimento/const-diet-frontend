import { http } from '@/services/http'
import { Food } from '@/types/food-types'

const API_PREFIX = '/foods'

export type ICreateFoodService = (food: Food) => Promise<Food>

export const createFoodService: ICreateFoodService = async (food: Food) => {
  const { data } = await http.post<Food, Food>(API_PREFIX, food)

  return data
}

export type IUpdateFoodService = (food: Food) => Promise<Food>

export const updateFoodService: IUpdateFoodService = async (food: Food) => {
  const { data } = await http.put<Food, Food>(API_PREFIX, food)

  return data
}

export type IGetFoodListService = () => Promise<Food[]>

export const getFoodListService: IGetFoodListService = async () => {
  const { data } = await http.get<Food[]>(API_PREFIX)

  return data
}

type GetPaginatedFoodListRequest = {
  page: number
  pageSize: number
}

type GetPaginatedFoodListResponse = ApiPaginationResponse<Food>

export type IGetPaginatedFoodListService = (
  params: GetPaginatedFoodListRequest,
) => Promise<GetPaginatedFoodListResponse>

export const getPaginatedFoodListService: IGetPaginatedFoodListService =
  async params => {
    const { data } = await http.get<GetPaginatedFoodListResponse>(API_PREFIX, {
      params,
    })

    return data
  }

export type IGetFoodByIdService = (foodId: number) => Promise<Food>

export const getFoodByIdService: IGetFoodByIdService = async foodId => {
  const { data } = await http.get<Food>(`${API_PREFIX}/${foodId}`)

  return data
}

export type IDeleteFoodService = (foodId: number) => Promise<void>

export const deleteFoodService: IDeleteFoodService = async foodId => {
  await http.delete(`${API_PREFIX}/${foodId}`)
}

type UploadFoodImageRequest = {
  foodId: number
  imageFile: File
}

export type IUploadFoodImageService = (
  params: UploadFoodImageRequest,
) => Promise<string>

export const uploadFoodImageService: IUploadFoodImageService = async ({
  foodId,
  imageFile,
}) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await http.post(
    `${API_PREFIX}/${foodId}/image-upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )

  return response.data as string
}
