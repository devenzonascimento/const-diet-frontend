import { useLayoutEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IGetMealByIdService,
  IUpdateMealService,
} from '@/services/http/meal-service'
import { MealFormSchema, mealFormSchema } from '@/schemas/meal-form-schema'
import { ApiPaginationResponse } from '@/types/api-responses-types'
import { Meal, MealFood } from '@/types/meal-types'
import { QueryKeys } from '@/types/query-keys'
import { RouteTypes } from '@/types/routes-types'

type PaginationData = {
  pageParam: number
  pages: ApiPaginationResponse<Meal>[]
}

type UseUpdateMealModelProps = {
  getMealByIdService: IGetMealByIdService
  updateMealService: IUpdateMealService
}

export function useUpdateMealModel({
  getMealByIdService,
  updateMealService,
}: UseUpdateMealModelProps) {
  const { mealId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: meal, isPending: isMealLoading } = useQuery({
    queryKey: [QueryKeys.Meal, Number(mealId)],
    queryFn: () => getMealByIdService(Number(mealId)),
    staleTime: 15 * 60 * 1000,
  })

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormSchema>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name ?? '',
      description: meal?.description ?? '',
      foods: meal?.foods ?? [],
    },
  })

  useLayoutEffect(() => {
    if (meal) {
      const mealFormData: MealFormSchema = {
        name: meal.name ?? '',
        description: meal.description ?? '',
        foods: meal.foods ?? [],
      }

      for (const [key, value] of Object.entries(mealFormData)) {
        setValue(key as keyof MealFormSchema, value)
      }
    }
  }, [meal, setValue])

  const [isFoodPickerOpen, setIsFoodPickerOpen] = useState(false)

  const foods = watch('foods') || []

  const handleAddFood = (food: MealFood) => {
    const foodAlreadyExists = foods.some(f => f.id === food.id)

    if (foodAlreadyExists) {
      const updatedFoods = foods.map(f => (f.id === food.id ? food : f))

      setValue('foods', updatedFoods)

      return
    }

    setValue('foods', [...foods, food])
  }

  const handleRemoveFood = (foodId: number) => {
    const updatedFoods = foods.filter(f => f.id !== foodId)

    setValue('foods', updatedFoods)
  }

  const handleOpenFoodPicker = () => {
    setIsFoodPickerOpen(true)
  }

  const handleCloseFoodPicker = () => {
    setIsFoodPickerOpen(false)
  }

  const handleNavigateToDetailsPage = () => {
    navigate(`${RouteTypes.MealDetailsPage}/${mealId}`)
  }

  const { mutateAsync: updateMealMutation } = useMutation({
    mutationFn: updateMealService,
    onSuccess(updatedMeal) {
      queryClient.setQueryData(
        [QueryKeys.Meal, updatedMeal.id],
        () => updatedMeal,
      )

      queryClient.setQueryData(
        [QueryKeys.MealList],
        (paginationData: PaginationData) => {
          return {
            ...paginationData,
            pages: paginationData?.pages?.map(page => ({
              ...page,
              items: page.items.map(food =>
                food.id === updatedMeal.id ? updatedMeal : food,
              ),
            })),
          }
        },
      )

      handleNavigateToDetailsPage()
    },
    onError(error) {
      throw new Error(error.message)
    },
  })

  const onSubmit = (mealForm: MealFormSchema) => {
    updateMealMutation({
      id: Number(mealId),
      name: mealForm.name,
      description: mealForm.description,
      foods: mealForm.foods,
    })
  }

  const isNotFound = Number.isNaN(mealId) || (!isMealLoading && !meal)

  return {
    mealId: Number(mealId),
    foods,
    handleAddFood,
    handleRemoveFood,
    isFoodPickerOpen,
    handleOpenFoodPicker,
    handleCloseFoodPicker,
    register,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) =>
      handleSubmit(onSubmit)(e),
    errors,
    isMealLoading,
    isNotFound,
    handleNavigateToDetailsPage,
  }
}
