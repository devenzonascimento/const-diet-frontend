import React from 'react'
import { useMyMealsModel } from './my-meals-model'
import { getPaginatedMealListService } from '@/services/http/meal-service'
import { MyMealsView } from './my-meals-view'

export function MyMealsPage() {
  const props = useMyMealsModel({
    getPaginatedMealListService: getPaginatedMealListService,
  })

  return <MyMealsView {...props} />
}
