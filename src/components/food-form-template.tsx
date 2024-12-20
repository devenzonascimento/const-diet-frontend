import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { DefaultInput } from '@/components/default-input'
import { SelectInput } from '@/components/select-input'
import { Button } from '@/components/ui/button'
import { FoodFormSchema } from '@/schemas/food-form-schema'
import { UNIT_OPTIONS } from '@/constants/constants'

type FoodFormTemplateProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  register: UseFormRegister<FoodFormSchema>
  errors: FieldErrors<FoodFormSchema>
}

export const FoodFormTemplate = ({
  handleSubmit,
  register,
  errors,
}: FoodFormTemplateProps) => {
  return (
    <form
      className="w-full flex flex-col gap-4 p-4 overflow-y-auto overflow-x-hidden"
      onSubmit={handleSubmit}
      data-testid="food-form"
    >
      <DefaultInput
        id="foodName-input"
        required
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
      <Button
        type="submit"
        className="w-full text-white bg-violet-600 hover:bg-violet-500"
      >
        Salvar alimento
      </Button>
    </form>
  )
}
