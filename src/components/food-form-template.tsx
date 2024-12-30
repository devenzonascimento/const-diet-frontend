import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/input'
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
      <Input
        id="foodName-input"
        required
        label="Nome do alimento"
        errorMessage={errors.name?.message}
        {...register('name')}
        data-testid="name-input"
      />
      <fieldset className="w-full grid grid-cols-2 gap-4">
        <Input
          id="quantity-input"
          type="number"
          label="Quantidade"
          errorMessage={errors.quantity?.message}
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
      <Input
        id="calories-input"
        type="number"
        label="Calorias"
        errorMessage={errors.calories?.message}
        {...register('calories')}
        data-testid="calories-input"
      />
      <Input
        id="carbo-input"
        type="number"
        label="Carboidratos em gramas"
        errorMessage={errors.carbohydrates?.message}
        {...register('carbohydrates')}
        data-testid="carbohydrates-input"
      />
      <Input
        id="protein-input"
        type="number"
        label="Proteínas em gramas"
        errorMessage={errors.proteins?.message}
        {...register('proteins')}
        data-testid="proteins-input"
      />
      <Input
        id="fat-input"
        type="number"
        label="Gorduras em gramas"
        errorMessage={errors.fats?.message}
        {...register('fats')}
        data-testid="fats-input"
      />
      <Input
        id="fiber-input"
        type="number"
        label="Fibras em gramas"
        errorMessage={errors.fibers?.message}
        {...register('fibers')}
        data-testid="fibers-input"
      />
      <Input
        id="sodium-input"
        type="number"
        label="Sódios em gramas"
        errorMessage={errors.sodium?.message}
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
