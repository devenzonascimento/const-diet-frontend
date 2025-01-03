import React from 'react'
import { useAddFoodModel } from './add-food-model'
import { Header } from '@/components/header'
import { FoodFormTemplate } from '@/components/food-form-template'

type AddFoodViewProps = ReturnType<typeof useAddFoodModel>

export const AddFoodView = ({
  handleSubmit,
  register,
  errors,
}: AddFoodViewProps) => {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Novo alimento"
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
