import { useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IGetFoodByIdService,
  IUpdateFoodService,
} from '@/services/http/food/food-service'
import { convertFoodMacronutrientsToBase } from '@/functions/convert-food-macronutrients-to-base'
import { foodFormSchema, FoodFormSchema } from '@/schemas/food-form-schema'
import { Food, FoodWithQuantity } from '@/types/food-types'
import { QueryKeys } from '@/types/query-keys'

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
    queryKey: [QueryKeys.Food, foodId],
    queryFn: () => getFoodByIdService(Number(foodId)),
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
      for (const [key, value] of Object.entries(food)) {
        setValue(key as keyof FoodFormSchema, value)
      }

      setValue('quantity', 100)
    }
  }, [food, setValue])

  const { mutateAsync } = useMutation({
    mutationFn: updateFoodService,
    onSuccess(updatedFood) {
      // Atualiza o alimento do cache que será exibido na pagina de Detalhe do Alimento
      queryClient.setQueryData([QueryKeys.Food], () => updatedFood)

      // Atualiza o alimento na listagem de alimentos do cache que será exibido na pagina Meus Alimentos
      queryClient.setQueryData([QueryKeys.FoodList], (foodList: Food[]) => {
        return foodList.map(food => {
          if (food.id === updatedFood.id) {
            return updatedFood
          }

          return food
        })
      })

      navigate(`/detalhes-do-alimento/${updatedFood.id}`)
    },
    onError(error) {
      throw new Error(error.message)
    },
  })

  const onSubmit = (formData: FoodFormSchema) => {
    const food: FoodWithQuantity = {
      id: Number(foodId),
      ...formData,
    }

    const parsedFood = convertFoodMacronutrientsToBase(food, 100)

    mutateAsync({
      id: parsedFood.id,
      name: parsedFood.name,
      unit: parsedFood.unit,
      calories: parsedFood.calories,
      carbohydrates: parsedFood.carbohydrates,
      proteins: parsedFood.proteins,
      fats: parsedFood.fats,
      fibers: parsedFood.fibers,
      sodium: parsedFood.sodium,
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
