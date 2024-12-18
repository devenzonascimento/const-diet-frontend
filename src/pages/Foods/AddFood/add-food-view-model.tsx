import React from 'react'
import { useAddFoodModel } from './add-food-model'
import { AddFoodView } from './add-food-view'
import { createFoodService } from '@/services/http/food/food-service'

export function AddFoodPage() {
  const props = useAddFoodModel({ createFoodService })

  return <AddFoodView {...props} />
}
