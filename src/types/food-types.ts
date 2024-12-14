export type Food = {
  id: number
  name: string
  unit: UnitTypes
  calories: number
} & Macronutrients

export type Macronutrients = {
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export enum MacronutrientTypes {
  Carbohydrate = 'Carbohydrate',
  Protein = 'Protein',
  Fat = 'Fat',
  Fiber = 'Fiber',
  Sodium = 'Sodium',
}

export enum UnitTypes {
  GRAMS = 'GRAMS',
  MILILITERS = 'MILILITERS',
}

export type FoodWithQuantity = Food & {
  quantity: number
}

const unitsAbbreviationMap: Record<UnitTypes, string> = {
  GRAMS: 'g',
  MILILITERS: 'ml',
} as const
