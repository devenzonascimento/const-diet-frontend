import { MealFood } from '@/types/meal-types'
import { unitAbbreviationsMap } from '@/types/food-types'

export function generateMealFoodList(foods: MealFood[]): string {
  let mealFoodList = ''

  for (let i = 0; i < foods.length; i++) {
    const food = foods[i]

    const isLastFood = foods.length - 1 === i

    mealFoodList += `${food.quantity}${unitAbbreviationsMap[food.unit]} de ${food.name}${isLastFood ? '' : ', '}`
  }

  return mealFoodList
}
