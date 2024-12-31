import { generateMealFoodList } from './generateMealFoodList'
import { unitAbbreviationsMap, UnitTypes } from '@/types/food-types'
import { MealFood } from '@/types/meal-types'

describe('(Pure Function) generateMealFoodList', () => {
  it('should return a formatted string for a list of foods', () => {
    const foods = [
      { name: 'Apple', quantity: 2, unit: UnitTypes.Grams },
      { name: 'Banana', quantity: 3, unit: UnitTypes.Grams },
      { name: 'Milk', quantity: 1, unit: UnitTypes.Mililiters },
    ] as MealFood[]

    const result = generateMealFoodList(foods)
    expect(result).toBe(
      `2${unitAbbreviationsMap.GRAMS} de Apple, 3${unitAbbreviationsMap.GRAMS} de Banana, 1${unitAbbreviationsMap.MILILITERS} de Milk`,
    )
  })

  it('should return an empty string for an empty list', () => {
    const foods: MealFood[] = []
    const result = generateMealFoodList(foods)
    expect(result).toBe('')
  })

  it('should handle a single food item', () => {
    const foods = [
      { name: 'Orange', quantity: 1, unit: UnitTypes.Grams },
    ] as MealFood[]

    const result = generateMealFoodList(foods)
    expect(result).toBe(`1${unitAbbreviationsMap.GRAMS} de Orange`)
  })
})
