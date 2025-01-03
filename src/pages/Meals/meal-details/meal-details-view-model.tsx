import React from 'react'
import { useMealDetailsModel } from './meal-details-model'
import {
  deleteMealService,
  getMealByIdService,
  uploadMealImageService,
} from '@/services/http/meal-service'
import { MealDetailsView } from './meal-details-view'

export function MealDetailsPage() {
  const props = useMealDetailsModel({
    getMealByIdService,
    uploadMealImageService,
    deleteMealService,
  })

  return <MealDetailsView {...props} />
}
