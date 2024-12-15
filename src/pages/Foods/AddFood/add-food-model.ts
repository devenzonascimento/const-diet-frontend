import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { IAddFoodService } from '@/services/http/food/food-service'
import { convertFoodMacronutrientsToBase } from '@/functions/convert-food-macronutrients-to-base'
import { foodFormSchema, FoodFormSchema } from '@/schemas/food-form-schema'
import { Food, FoodWithQuantity } from '@/types/food-types'
import { QueryKeys } from '@/types/query-keys'

type useAddFoodModelProps = {
  addFoodService: IAddFoodService
}

export function useAddFoodModel({ addFoodService }: useAddFoodModelProps) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodFormSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: addFoodService,
    onSuccess(newFood) {
      queryClient.setQueryData([QueryKeys.FoodList], (foodList: Food[]) => {
        return [...foodList, newFood]
      })

      navigate('/meus-alimentos')
    },
    onError(error) {
      throw new Error(error.message)
    },
  })

  const onSubmit = (formData: FoodFormSchema) => {
    const food: FoodWithQuantity = {
      id: 0,
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

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) =>
      handleSubmit(onSubmit)(e),
    register,
    errors,
  }
}
