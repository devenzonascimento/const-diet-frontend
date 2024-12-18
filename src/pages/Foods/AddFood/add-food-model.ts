import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ICreateFoodService } from '@/services/http/food/food-service'
import { convertFoodValuesBasedOnQuantity } from '@/functions/convert-food-values-based-on-quantity'
import { foodFormSchema, FoodFormSchema } from '@/schemas/food-form-schema'
import { QueryKeys } from '@/types/query-keys'
import { DEFAULT_QUANTITY } from '@/constants/constants'

type UseAddFoodModelProps = {
  createFoodService: ICreateFoodService
}

export function useAddFoodModel({ createFoodService }: UseAddFoodModelProps) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodFormSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createFoodMutation } = useMutation({
    mutationFn: createFoodService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FoodList] })
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

    const createdFood = await createFoodMutation({
      id: 0,
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

    navigate(`/detalhes-do-alimento/${createdFood.id}`)
  }

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) =>
      handleSubmit(onSubmit)(e),
    register,
    errors,
  }
}
