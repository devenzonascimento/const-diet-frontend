import React, { useState } from 'react'
import {
  ArrowLeft,
  EllipsisVerticalIcon,
  FlameIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react'
import { MacronutrientBadge } from '@/components/macronutrient-badge'
import { MacronutrientTypes } from '@/types/food-types'
import { useFoodDetailsModel } from './food-details-model'
import { FoodDetailsLoadingPage } from './components/loading-page'
import { FoodDetailsNotFoundPage } from './components/not-found-page'
import { OptionsDropdown } from './components/options-dropdown'
import { Spinner } from '@/components/spinner'

type FoodDetailsViewProps = ReturnType<typeof useFoodDetailsModel>

export function FoodDetailsView({
  food,
  isFoodLoading,
  handleBackToFoodListPage,
  handleNavigateToEditPage,
  handleDeleteFood,
  isDeleteLoading,
}: FoodDetailsViewProps) {
  if (isFoodLoading) {
    return <FoodDetailsLoadingPage />
  }

  if (!food) {
    return <FoodDetailsNotFoundPage />
  }

  return (
    <div className="flex-1 flex flex-col gap-28 bg-linear-to-b/oklch bg-highlight to-violet-400 to-20%">
      <header className="w-full flex items-center justify-between">
        <button
          type="button"
          title='Voltar'
          className="size-14 flex items-center justify-center p-3"
          onClick={handleBackToFoodListPage}
          datatest-id="back-button"
        >
          <ArrowLeft className="size-full text-white shrink-0" />
        </button>

        <OptionsDropdown
          onEdit={handleNavigateToEditPage}
          onDelete={handleDeleteFood}
        />
      </header>

      <div className="flex-1 flex flex-col items-center gap-4 p-4 bg-zinc-900 rounded-t-[60px]">
        <div className="-mt-32 aspect-square size-36 p-1 bg-radial-[at_25%_25%] from-violet-600 to-violet-300 to-75% border-4 border-white rounded-full overflow-hidden">
          <img
            src="/assets/strawberry.jpg"
            alt=""
            className="block size-full object-cover rounded-full"
          />
        </div>

        <h2 className="text-center text-2xl capitalize text-white font-medium">
          {food?.name}
        </h2>

        <div className="h-16 flex items-center gap-2">
          <FlameIcon className="size-10 text-white fill-violet-300" />
          <p className="text-4xl font-semibold text-white">
            {food?.calories}
            <span className="text-base font-semibold text-white">kcal</span>
          </p>
        </div>

        <div className="w-full grid grid-cols-2 grid-rows-3 gap-3">
          <MacronutrientBadge
            type={MacronutrientTypes.Carbohydrate}
            unit={food?.unit}
            value={food?.carbohydrates || 0}
            className="col-span-2"
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Protein}
            unit={food?.unit}
            value={food?.proteins || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Fat}
            unit={food?.unit}
            value={food?.fats || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Fiber}
            unit={food?.unit}
            value={food?.fibers || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Sodium}
            unit={food?.unit}
            value={food?.sodium || 0}
          />
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
