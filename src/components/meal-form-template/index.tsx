import React from 'react'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { CherryIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FoodPicker } from '@/components/food-picker/food-picker-view-model'
import { unitAbbreviationsMap } from '@/types/food-types'
import { MealFood } from '@/types/meal-types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { MealFormSchema } from '@/schemas/meal-form-schema'

type MealFormTemplateProps = {
  foods: MealFood[]
  handleAddFood: (food: MealFood) => void
  handleRemoveFood(foodId: number): void
  isFoodPickerOpen: boolean
  handleOpenFoodPicker: () => void
  handleCloseFoodPicker: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  register: UseFormRegister<MealFormSchema>
  errors: FieldErrors<MealFormSchema>
}
export function MealFormTemplate({
  foods,
  handleAddFood,
  handleRemoveFood,
  isFoodPickerOpen,
  handleOpenFoodPicker,
  handleCloseFoodPicker,
  register,
  handleSubmit,
  errors,
}: MealFormTemplateProps) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto overflow-x-hidden"
        data-testid="meal-form"
      >
        <Input
          id="name-input"
          label="Nome"
          required
          errorMessage={errors.name?.message}
          {...register('name')}
          data-testid="name-input"
        />

        <Textarea
          rows={3}
          id="name-textarea"
          label="Descrição"
          className="resize-none"
          {...register('description')}
          data-testid="description-input"
        />

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="pb-1 text-lg text-white">
              Alimentos
              <span className="pl-0.5 text-error">*</span>
            </p>

            <button
              type="button"
              className="size-8 flex items-center justify-center"
              onClick={handleOpenFoodPicker}
              data-testid="add-food-button"
            >
              <PlusIcon className="size-6 text-white shrink-0" />
            </button>
          </div>

          {/* LISTAGEM DE ALIMENTOS SELECIONADOS */}
          {foods.length > 0 && (
            <ul className="flex-1 p-2 flex flex-col gap-2 border border-violet-300 rounded-md">
              {foods.map(food => (
                <li
                  key={food.id}
                  className="flex items-center justify-between bg-zinc-700 rounded-xl overflow-hidden"
                >
                  <span className="px-2 text-white truncate">
                    {`${food.quantity}${unitAbbreviationsMap[food.unit]} de ${food.name}`}
                  </span>
                  <Button
                    type="button"
                    size="icon"
                    className="bg-violet-600 rounded-none p-2"
                    onClick={() => handleRemoveFood(food.id)}
                    data-testid="remove-food-button"
                  >
                    <Trash2Icon className="text-white shrink-0" />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {/* LISTAGEM SEM NENHUM ALIMENTO SELECIONADO */}
          {foods.length === 0 && (
            <button
              type="button"
              onClick={handleOpenFoodPicker}
              className="flex-1 p-2 flex flex-col items-center justify-center gap-2 border border-violet-300 rounded-md"
            >
              <CherryIcon className="size-32 stroke-1 text-zinc-400" />
              <div className="flex items-center gap-2">
                <PlusIcon className="size-5 text-zinc-400 shrink-0" />
                <p className="text-lg text-zinc-400 font-medium">
                  Adicionar alimentos
                </p>
              </div>
            </button>
          )}

          {errors.foods?.message && (
            <span className="text-sm text-error" data-testid="error-message">
              {errors.foods?.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full text-white bg-violet-600 hover:bg-violet-500"
          data-testid="submit-button"
        >
          Salvar alimento
        </Button>
      </form>

      {isFoodPickerOpen && (
        <FoodPicker onSelect={handleAddFood} onClose={handleCloseFoodPicker} />
      )}
    </>
  )
}
