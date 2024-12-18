import { Food } from '@/types/food-types'
import { Macronutrients } from '@/types/macronutrients-types'

type FoodStats = Pick<Food, 'calories'> & Macronutrients

type ConvertFoodValuesToBaseParams = {
  stats: FoodStats
  currentQuantity: number
  desiredQuantity: number
}

export function convertFoodValuesBasedOnQuantity({
  stats,
  currentQuantity,
  desiredQuantity = 100,
}: ConvertFoodValuesToBaseParams): FoodStats {
  if (currentQuantity === desiredQuantity || currentQuantity <= 0) {
    return stats
  }

  const multiplier = desiredQuantity / currentQuantity

  const keyValueArray = Object.entries(stats)

  const convertKeyValueArray = keyValueArray.map(
    ([propertyName, propertyValue]) => {
      return [propertyName, propertyValue * multiplier]
    },
  )

  const convertedData = Object.fromEntries(convertKeyValueArray)

  return convertedData
}
