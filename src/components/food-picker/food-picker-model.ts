import { useState } from 'react'
import { useGetPaginatedFoodList } from '@/hooks/use-get-paginated-food-list'
import { IGetPaginatedFoodListService } from '@/services/http/food/food-service'
import { Food } from '@/types/food-types'
import { MealFood } from '@/types/meal-types'
import { z } from 'zod'

const quantityValidationSchema = z.coerce
  .number()
  .positive({ message: 'A quantidade deve ser maior que zero.' })

type UseFoodPickerModelProps = {
  getPaginatedFoodListService: IGetPaginatedFoodListService
  onSelect: (food: MealFood) => void
  onClose: () => void
}

export function useFoodPickerModel({
  getPaginatedFoodListService,
  onSelect,
  onClose,
}: UseFoodPickerModelProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const { foods, isFoodsLoading, handlePagination, hasNextPage } =
    useGetPaginatedFoodList({ getPaginatedFoodListService })

  const filteredFoods = foods?.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState('')
  const [quantityFieldError, setQuantityFieldError] = useState('')

  const handleSelectFood = (food: Food) => {
    selectedFood === food ? setSelectedFood(null) : setSelectedFood(food)
  }

  const isFoodSelected = (foodId: number) => foodId === selectedFood?.id

  const handleSubmit = () => {
    if (!selectedFood) {
      return
    }

    const result = quantityValidationSchema.safeParse(quantity)

    if (!result.success) {
      setQuantityFieldError(result.error.formErrors.formErrors[0])

      return
    }

    onSelect({
      ...selectedFood,
      quantity: Number(quantity),
    })

    onClose()
  }

  return {
    foods: filteredFoods || [],
    isFoodsLoading,
    handlePagination,
    hasNextPage,
    searchTerm,
    setSearchTerm,
    selectedFood,
    handleSelectFood,
    quantity,
    quantityFieldError,
    setQuantity,
    isSubmitButtonDisabled: !quantity,
    handleSubmit,
    isFoodSelected,
    onClose,
  }
}
