import { useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IGetFoodByIdService,
  IUpdateFoodService,
} from '@/services/http/food/food-service'
import { convertFoodValuesBasedOnQuantity } from '@/functions/convert-food-values-based-on-quantity'
import { foodFormSchema, FoodFormSchema } from '@/schemas/food-form-schema'
import { DEFAULT_QUANTITY } from '@/constants/constants'
import { Food } from '@/types/food-types'
import { QueryKeys } from '@/types/query-keys'

type PaginationData<T> = {
  pageParams: number[]
  pages: {
    itens: T[]
    currentPage: number
    totalCount: number
    totalPages: number
  }[]
}

type UseEditFoodModelProps = {
  getFoodByIdService: IGetFoodByIdService
  updateFoodService: IUpdateFoodService
}

export function useEditFoodModel({
  getFoodByIdService,
  updateFoodService,
}: UseEditFoodModelProps) {
  const navigate = useNavigate()

  const { foodId } = useParams()

  const queryClient = useQueryClient()

  const { data: food, isPending: isFoodLoading } = useQuery({
    queryKey: [QueryKeys.Food, Number(foodId)],
    queryFn: () => getFoodByIdService(Number(foodId)),
    staleTime: 15 * 60 * 1000,
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: food,
  })

  useLayoutEffect(() => {
    if (food) {
      const foodFormData: FoodFormSchema = {
        ...food,
        ...food?.macronutrients,
        quantity: DEFAULT_QUANTITY,
      }

      for (const [key, value] of Object.entries(foodFormData)) {
        setValue(key as keyof FoodFormSchema, value)
      }
    }
  }, [food, setValue])

  const { mutateAsync: updateFoodMutation } = useMutation({
    mutationFn: updateFoodService,
    onSuccess(updatedFood) {
      // Atualiza o alimento do cache que será exibido na pagina de Detalhe do Alimento
      queryClient.setQueryData(
        [QueryKeys.Food, updatedFood.id],
        () => updatedFood,
      )

      // Atualiza o alimento na listagem de alimentos do cache que será exibido na pagina Meus Alimentos
      queryClient.setQueryData(
        [QueryKeys.FoodList],
        (paginationData: PaginationData<Food>) => {
          return {
            ...paginationData,
            pages: paginationData?.pages?.map(page => ({
              ...page,
              itens: page.itens.map(food =>
                food.id === updatedFood.id ? updatedFood : food,
              ),
            })),
          }
        },
      )

      navigate(`/detalhes-do-alimento/${foodId}`)
    },
    onError(error) {
      throw new Error(error.message)
    },
  })

  const onSubmit = async (formData: FoodFormSchema) => {
    const foodStatsConvertedToBase100 = convertFoodValuesBasedOnQuantity({
      currentQuantity: formData.quantity,
      desiredQuantity: DEFAULT_QUANTITY,
      stats: {
        calories: formData.calories,
        carbohydrates: formData.carbohydrates,
        proteins: formData.proteins,
        fats: formData.fats,
        fibers: formData.fibers,
        sodium: formData.sodium,
      },
    })

    await updateFoodMutation({
      id: Number(foodId),
      name: formData.name,
      unit: formData.unit,
      calories: foodStatsConvertedToBase100.calories,
      macronutrients: {
        carbohydrates: foodStatsConvertedToBase100.carbohydrates,
        proteins: foodStatsConvertedToBase100.proteins,
        fats: foodStatsConvertedToBase100.fats,
        fibers: foodStatsConvertedToBase100.fibers,
        sodium: foodStatsConvertedToBase100.sodium,
      },
    })
  }

  const isNotFound = Number.isNaN(foodId) || (!isFoodLoading && !food)

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) =>
      handleSubmit(onSubmit)(e),
    register,
    errors,
    isFoodLoading,
    isNotFound,
  }
}
