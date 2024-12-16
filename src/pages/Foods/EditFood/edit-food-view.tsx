import React from 'react'
import { useEditFoodModel } from './edit-food-model'
import { EditFoodLoadingPage } from './components/loading-page'
import { FoodNotFoundPage } from '../not-found-page'
import { Header } from '@/components/header'
import { FoodFormTemplate } from '@/components/food-form-template'

type EditFoodViewProps = ReturnType<typeof useEditFoodModel>

export function EditFoodView({
  handleSubmit,
  register,
  errors,
  isFoodLoading,
  isNotFound,
}: EditFoodViewProps) {
  if (isFoodLoading) {
    return <EditFoodLoadingPage />
  }

  if (isNotFound) {
    return <FoodNotFoundPage />
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Editar alimento"
        leftButtonNavigateTo="/meus-alimentos"
        className="sticky top-0"
      />
      <FoodFormTemplate
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </div>
  )
}
