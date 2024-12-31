import React from 'react'
import { useFoodPickerModel } from './food-picker-model'
import { getPaginatedFoodListService } from '@/services/http/food/food-service'
import { FoodPickerView } from './food-picker-view'
import { MealFood } from '@/types/meal-types'

export type FoodPickerProps = {
  onSelect: (food: MealFood) => void
  onClose: () => void
}

export function FoodPicker({ onSelect, onClose }: FoodPickerProps) {
  const props = useFoodPickerModel({
    getPaginatedFoodListService: getPaginatedFoodListService,
    onSelect,
    onClose,
  })

  return <FoodPickerView {...props} />
}
