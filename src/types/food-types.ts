import { Macronutrients } from './macronutrients-types'

export type Food = {
  id: number
  name: string
  imageUrl?: string
  unit: UnitTypes
  calories: number
  macronutrients: Macronutrients
}

export enum UnitTypes {
  Grams = 'GRAMS',
  Mililiters = 'MILILITERS',
}

export type FoodWithQuantity = Food & {
  quantity: number
}

const unitsAbbreviationMap: Record<UnitTypes, string> = {
  GRAMS: 'g',
  MILILITERS: 'ml',
} as const
