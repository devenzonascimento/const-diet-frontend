import React from 'react'
import { useEditFoodModel } from './edit-food-model'
import {
  getFoodByIdService,
  updateFoodService,
} from '@/services/http/food/food-service'
import { EditFoodView } from './edit-food-view'

export function EditFoodPage() {
  const props = useEditFoodModel({ getFoodByIdService, updateFoodService })

  return <EditFoodView {...props} />
}
