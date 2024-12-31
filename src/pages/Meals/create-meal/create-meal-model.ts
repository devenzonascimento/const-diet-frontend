import { MealFormSchema, mealFormSchema } from '@/schemas/meal-form-schema'
import { ICreateMealService } from '@/services/http/meal-service'
import { MealFood } from '@/types/meal-types'
import { RouteTypes } from '@/types/routes-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type UseCreateMealModelProps = {
  createMealService: ICreateMealService
}

export function useCreateMealModel({
  createMealService,
}: UseCreateMealModelProps) {
  const navigate = useNavigate()

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormSchema>({
    resolver: zodResolver(mealFormSchema),
  })

  const foods = watch('foods') || []

  const [isFoodPickerOpen, setIsFoodPickerOpen] = useState(false)

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

  const { mutateAsync: createMealMutation } = useMutation({
    mutationFn: createMealService,
    onSuccess: () => {
      navigate(RouteTypes.MyMealsPage)
    },
  })

  const onSubmit = (mealForm: MealFormSchema) => {
    createMealMutation({
      id: 0,
      name: mealForm.name,
      description: mealForm.description,
      foods: mealForm.foods,
    })
  }

  return {
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
  }
}
