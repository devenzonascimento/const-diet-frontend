import {
  deleteFoodService,
  getFoodByIdService,
} from '@/services/http/food/food-service'
import { useFoodDetailsModel } from './food-details-model'
import { FoodDetailsView } from './food-details-view'
import React from 'react'

export function FoodDetailsPage() {
  const props = useFoodDetailsModel({ getFoodByIdService, deleteFoodService })

  return <FoodDetailsView {...props} />
}
