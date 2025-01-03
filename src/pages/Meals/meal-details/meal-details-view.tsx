import React from 'react'
import { useMealDetailsModel } from './meal-details-model'
import { ArrowLeft, FlameIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Image } from '@/components/image'
import { MacronutrientBadge } from '@/components/macronutrient-badge'
import { Spinner } from '@/components/spinner'
import { MacronutrientTypes } from '@/types/macronutrients-types'

export function MealDetailsView({
  meal,
  mealFoodList,
  isMealLoading,
  imageUploadTrigger,
  handleBackToMealListPage,
  handleNavigateToUpdateMealPage,
  handleDeleteMeal,
  isDeleteLoading,
}: ReturnType<typeof useMealDetailsModel>) {
  if (isMealLoading) {
    return <div>LOADING...</div> // TODO: Create a loading page
  }

  if (!meal) {
    return <div>NOT FOUND</div> // TODO: Create a not found page
  }

  return (
    <div className="flex-1 flex flex-col gap-20 bg-linear-to-b/oklch bg-highlight to-violet-300 to-20%">
      <header className="sticky inset-0 z-10 w-full flex items-center justify-between">
        <button
          type="button"
          className="size-14 flex items-center justify-center p-3"
          onClick={handleBackToMealListPage}
          datatest-id="back-button"
        >
          <ArrowLeft className="size-full text-white shrink-0" />
        </button>

        <div className="flex items-center">
          <button
            type="button"
            className="size-14 flex items-center justify-center p-3"
            onClick={handleNavigateToUpdateMealPage}
          >
            <PencilIcon className="size-full text-white shrink-0" />
          </button>

          <button
            type="button"
            className="size-14 flex items-center justify-center p-3"
            onClick={handleDeleteMeal}
          >
            <Trash2Icon className="size-full text-white shrink-0" />
          </button>
        </div>
      </header>

      <div className="relative flex-1 flex flex-col gap-4 p-4 pt-24 bg-zinc-900 rounded-tr-[60px]">
        <div className="absolute top-0 -translate-y-1/2 left-4 size-36 p-1 bg-radial-[at_25%_25%] from-violet-700 to-violet-300 to-75% border-4 border-white rounded-full">
          <Image
            size="large"
            src={meal?.imageUrl ?? ''}
            alt={meal?.name ?? ''}
          />
          <button
            type="button"
            onClick={imageUploadTrigger}
            className="absolute bottom-0 right-2 p-2 bg-zinc-700 rounded-full"
          >
            <PencilIcon className="size-5 text-white" />
          </button>
        </div>

        <div className="absolute top-4 right-4 size-20 aspect-square flex flex-col items-center justify-center bg-zinc-700 rounded-full">
          <FlameIcon className="size-6 text-white fill-violet-500" />
          <p className="px-5 text-xl font-semibold text-white">
            {meal?.calories}
          </p>
        </div>

        <h1 className="text-start text-2xl capitalize text-white font-medium">
          {meal?.name}
        </h1>

        <div className="w-full flex flex-col">
          <h2 className="w-full text-start text-lg text-white font-semibold">
            Descrição
          </h2>
          <p className="text-start text-base text-zinc-200">
            {meal?.description}
          </p>
        </div>

        <div className="w-full flex flex-col">
          <h2 className="w-full text-start text-lg text-white font-semibold">
            Alimentos
          </h2>
          <ul className="w-full px-1 flex flex-col items-start">
            {mealFoodList.map(mealFood => (
              <li
                key={mealFood.id}
                className="list-disc list-inside text-white"
              >
                {mealFood.presentation}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col gap-1">
          <h2 className="w-full text-start text-lg text-white font-semibold">
            Informações Nutricionais
          </h2>
          <div className="w-full grid grid-cols-2 grid-rows-3 gap-3">
            <MacronutrientBadge
              type={MacronutrientTypes.Carbohydrate}
              value={meal.macronutrients?.carbohydrates || 0}
              className="col-span-2"
            />

            <MacronutrientBadge
              type={MacronutrientTypes.Protein}
              value={meal.macronutrients?.proteins || 0}
            />

            <MacronutrientBadge
              type={MacronutrientTypes.Fat}
              value={meal.macronutrients?.fats || 0}
            />

            <MacronutrientBadge
              type={MacronutrientTypes.Fiber}
              value={meal.macronutrients?.fibers || 0}
            />

            <MacronutrientBadge
              type={MacronutrientTypes.Sodium}
              value={meal.macronutrients?.sodium || 0}
            />
          </div>
        </div>
      </div>

      {isDeleteLoading && (
        <div className="h-screen w-screen fixed top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black/70">
          <div className="size-36 p-8 bg-zinc-700 rounded-xl">
            <Spinner className="size-full border-8" />
          </div>
        </div>
      )}
    </div>
  )
}
