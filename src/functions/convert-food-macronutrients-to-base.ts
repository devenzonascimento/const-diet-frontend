import { FoodWithQuantity } from '@/types/food-types'

type ValuesToConvert = Omit<
  FoodWithQuantity,
  'id' | 'name' | 'unit' | 'quantity'
>

export function convertFoodMacronutrientsToBase(
  food: FoodWithQuantity,
  baseToConvert: number,
): FoodWithQuantity {
  const { id, name, unit, quantity, ...dataToConvert } = food

  if (quantity === baseToConvert || quantity <= 0) {
    return food
  }

  const multiplier = baseToConvert / quantity

  const keyValueArray = Object.entries(dataToConvert)

  const convertKeyValueArray = keyValueArray.map(([key, value]) => {
    return [key, value * multiplier]
  })

  const convertedData: ValuesToConvert =
    Object.fromEntries(convertKeyValueArray)

  return {
    ...convertedData,
    id,
    name,
    unit,
    quantity: baseToConvert,
  }
}
