import React from 'react'
import { useUpdateMealModel } from './update-meal-model'
import {
  getMealByIdService,
  updateMealService,
} from '@/services/http/meal-service'
import { UpdateMealView } from './update-meal-view'

export function UpdateMealPage() {
  const props = useUpdateMealModel({
    getMealByIdService: getMealByIdService,
    updateMealService: updateMealService,
  })

  return <UpdateMealView {...props} />
}
