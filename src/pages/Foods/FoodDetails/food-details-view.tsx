import React from 'react'
import { useFoodDetailsModel } from './food-details-model'
import { FoodDetailsLoadingPage } from './components/loading-page'
import { FoodNotFoundPage } from '../not-found-page'
import { ArrowLeft, CameraIcon, FlameIcon, PencilIcon } from 'lucide-react'
import { OptionsDropdown } from './components/options-dropdown'
import { MacronutrientBadge } from '@/components/macronutrient-badge'
import { Spinner } from '@/components/spinner'
import { MacronutrientTypes } from '@/types/macronutrients-types'
import { Image } from '@/components/image'

type FoodDetailsViewProps = ReturnType<typeof useFoodDetailsModel>

export function FoodDetailsView({
  food,
  isFoodLoading,
  imageUploadTrigger,
  handleBackToFoodListPage,
  handleNavigateToEditPage,
  handleDeleteFood,
  isDeleteLoading,
}: FoodDetailsViewProps) {
  if (isFoodLoading) {
    return <FoodDetailsLoadingPage />
  }

  if (!food) {
    return <FoodNotFoundPage />
  }

  return (
    <div className="flex-1 flex flex-col gap-28 bg-linear-to-b/oklch bg-highlight to-violet-400 to-20%">
      <header className="w-full flex items-center justify-between">
        <button
          type="button"
          title="Voltar"
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
        <div className="-mt-32">
          {!food.imageUrl && (
            <button
              type="button"
              onClick={imageUploadTrigger}
              className="size-36 p-8 flex items-center justify-center bg-zinc-700 rounded-full"
            >
              <CameraIcon className="size-24 stroke-1 text-white" />
            </button>
          )}

          {food.imageUrl && (
            <div className="relative">
              <div className="size-36 p-1 bg-radial-[at_25%_25%] from-violet-700 to-violet-300 to-75% border-4 border-white rounded-full overflow-hidden">
                <Image src={food?.imageUrl ?? ''} alt={food?.name ?? ''} />
              </div>

              <button
                type="button"
                onClick={imageUploadTrigger}
                className="absolute bottom-0 right-2 p-2 bg-zinc-700 rounded-full"
              >
                <PencilIcon className="size-5 text-white" />
              </button>
            </div>
          )}
        </div>

        <h2 className="text-center text-2xl capitalize text-white font-medium">
          {food?.name}
        </h2>

        <div className="h-16 flex items-center gap-2">
          <FlameIcon className="size-10 text-white fill-violet-500" />
          <p className="text-4xl font-semibold text-white">
            {food?.calories}
            <span className="text-base font-semibold text-white">kcal</span>
          </p>
        </div>

        <div className="w-full grid grid-cols-2 grid-rows-3 gap-3">
          <MacronutrientBadge
            type={MacronutrientTypes.Carbohydrate}
            value={food.macronutrients?.carbohydrates || 0}
            className="col-span-2"
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Protein}
            value={food.macronutrients?.proteins || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Fat}
            value={food.macronutrients?.fats || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Fiber}
            value={food.macronutrients?.fibers || 0}
          />

          <MacronutrientBadge
            type={MacronutrientTypes.Sodium}
            value={food.macronutrients?.sodium || 0}
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
