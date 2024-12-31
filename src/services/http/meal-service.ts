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

type UpdateMealRequest = {
  id: number
  name: string
  description?: string
  foods: MealFood[]
}

export type IUpdateMealService = (meal: Meal) => Promise<Meal>

export const updateMealService: IUpdateMealService = async meal => {
  const { data } = await http.put<UpdateMealRequest, Meal>(API_PREFIX, meal)

  return data
}

export type IGetMealListService = () => Promise<Meal[]>

export const getMealListService: IGetMealListService = async () => {
  const { data } = await http.get<Meal[]>(API_PREFIX)

  return data
}

type GetPaginatedMealListRequest = {
  page: number
  pageSize: number
}

type GetPaginatedMealListResponse = {
  items: Meal[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export type IGetPaginatedMealListService = (
  params: GetPaginatedMealListRequest,
) => Promise<GetPaginatedMealListResponse>

export const getPaginatedMealListService: IGetPaginatedMealListService =
  async params => {
    const { data } = await http.get<GetPaginatedMealListResponse>(API_PREFIX, {
      params,
    })

    return data
  }

export type IGetMealByIdService = (mealId: number) => Promise<Meal>

export const getMealByIdService: IGetMealByIdService = async mealId => {
  const { data } = await http.get<Meal>(`${API_PREFIX}/${mealId}`)

  return data
}

export type IDeleteMealService = (mealId: number) => Promise<void>

export const deleteMealService: IDeleteMealService = async mealId => {
  await http.delete(`${API_PREFIX}/${mealId}`)
}

type UploadMealImageRequest = {
  mealId: number
  imageFile: File
}

export type IUploadMealImageService = (
  params: UploadMealImageRequest,
) => Promise<string>

export const uploadMealImageService: IUploadMealImageService = async ({
  mealId,
  imageFile,
}) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await http.post(
    `${API_PREFIX}/${mealId}/image-upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )

  return response.data as string
}
