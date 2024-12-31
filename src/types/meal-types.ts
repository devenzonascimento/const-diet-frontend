import { Food } from './food-types'
import { Macronutrients } from './macronutrients-types'

export type Meal = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  calories: number
  macronutrients: Macronutrients
  foods: MealFood[]
}

export type MealFood = Food & { quantity: number }
