import React from 'react'
import { useCreateMealModel } from './create-meal-model'
import { Header } from '@/components/header'
import { MealFormTemplate } from '@/components/meal-form-template'
import { RouteTypes } from '@/types/routes-types'

export function CreateMealView(props: ReturnType<typeof useCreateMealModel>) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Nova Refeição"
        leftButtonNavigateTo={RouteTypes.MyMealsPage}
        className="sticky top-0"
      />

      <MealFormTemplate {...props} />
    </div>
  )
}
