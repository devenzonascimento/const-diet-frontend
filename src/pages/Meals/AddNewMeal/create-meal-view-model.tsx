import React from 'react'
import { useCreateMealModel } from './create-meal-model'
import { createMealService } from '@/services/http/meal-service'
import { CreateMealView } from './create-meal-view'

export function CreateMealPage() {
  const props = useCreateMealModel({
    createMealService: createMealService,
  })

  return <CreateMealView {...props} />
}
