export type Food = {
  id: number
  name: string
  unit: 'GRAMS' | 'MILILITERS'
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export type FoodWithQuantity = Food & {
  quantity: number
}
