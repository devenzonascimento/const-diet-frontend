import React from 'react'
import { useAddFoodModel } from './add-food-model'
import { AddFoodView } from './add-food-view'
import { addFoodService } from '@/services/http/food/food-service'

export function AddFoodPage() {
  const props = useAddFoodModel({ addFoodService })

  return <AddFoodView {...props} />
}
