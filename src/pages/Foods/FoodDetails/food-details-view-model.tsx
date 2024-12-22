import React from 'react'
import { useFoodDetailsModel } from './food-details-model'
import {
  getFoodByIdService,
  uploadFoodImageService,
  deleteFoodService,
} from '@/services/http/food/food-service'
import { FoodDetailsView } from './food-details-view'

export function FoodDetailsPage() {
  const props = useFoodDetailsModel({
    getFoodByIdService,
    uploadFoodImageService,
    deleteFoodService,
  })

  return <FoodDetailsView {...props} />
}
