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
    <>
      <Header title="Novo alimento" leftButtonNavigateTo="/meus-alimentos" />
      <FoodFormTemplate
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </>
  )
}
