import React from 'react'

import { Header } from '@/components/header'
import { DefaultInput } from '@/components/default-input'
import { SelectInput } from '@/components/select-input'
import { Button } from '@/components/ui/button'

import { UNIT_OPTIONS } from '@/constants/constants'
import { useAddFoodModel } from './add-food-model'

type AddFoodViewProps = ReturnType<typeof useAddFoodModel>

export const AddFoodView = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
}: AddFoodViewProps) => {
  return (
    <>
      <Header title="Novo alimento" leftButtonNavigateTo="/meus-alimentos" />
      <form
        className="w-full flex flex-col gap-4 px-4 pb-4"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form-add-food"
      >
        <DefaultInput
          id="foodName-input"
          label="Nome do alimento"
          errorMessage={errors.name?.message}
          {...register('name')}
          data-testid="name-input"
        />
        <fieldset className="w-full grid grid-cols-2 gap-4">
          <DefaultInput
            id="quantity-input"
            label="Quantidade"
            {...register('quantity')}
            data-testid="quantity-input"
          />
          <SelectInput
            id="unit-input"
            label="Unidade"
            options={UNIT_OPTIONS}
            {...register('unit')}
            data-testid="unit-select-input"
          />
        </fieldset>
        <DefaultInput
          id="calories-input"
          label="Calorias"
          {...register('calories')}
          data-testid="calories-input"
        />
        <DefaultInput
          id="carbo-input"
          label="Carboidratos em gramas"
          {...register('carbohydrates')}
          data-testid="carbohydrates-input"
        />
        <DefaultInput
          id="protein-input"
          label="Proteínas em gramas"
          {...register('proteins')}
          data-testid="proteins-input"
        />
        <DefaultInput
          id="fat-input"
          label="Gorduras em gramas"
          {...register('fats')}
          data-testid="fats-input"
        />
        <DefaultInput
          id="fiber-input"
          label="Fibras em gramas"
          {...register('fibers')}
          data-testid="fibers-input"
        />
        <DefaultInput
          id="sodium-input"
          label="Sódios em gramas"
          {...register('sodium')}
          data-testid="sodium-input"
        />
        <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500">
          Salvar alimento
        </Button>
      </form>
    </>
  )
}
