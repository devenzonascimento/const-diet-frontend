import React from 'react'
import { useUpdateMealModel } from './update-meal-model'
import { Header } from '@/components/header'
import { MealFormTemplate } from '@/components/meal-form-template'
import { MealNotFoundPage } from '../not-found-page'
import { RouteTypes } from '@/types/routes-types'
import { UpdateMealLoadingPage } from './components/loading-page'

export function UpdateMealView(props: ReturnType<typeof useUpdateMealModel>) {
  const { isMealLoading, isNotFound, mealId } = props
  if (isMealLoading) {
    return <UpdateMealLoadingPage />
  }

  if (isNotFound) {
    return <MealNotFoundPage />
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Editar Refeição"
        leftButtonNavigateTo={`${RouteTypes.MealDetailsPage}/${mealId}`}
        className="sticky top-0"
      />

      <MealFormTemplate {...props} />
    </div>
  )
}
