import { describe, it, expect } from 'vitest'
import { convertFoodMacronutrientsToBase } from './convert-food-macronutrients-to-base'
import { FoodWithQuantity, UnitTypes } from '@/types/food-types'

describe('convertFoodMacronutrientsToBase', () => {
  it('should convert values correctly based on quantity', () => {
    const food: FoodWithQuantity = {
      id: 1,
      name: 'Arroz',
      unit: UnitTypes.Grams,
      calories: 200,
      carbohydrates: 50,
      proteins: 4,
      fats: 1,
      fibers: 2,
      sodium: 0.5,
      quantity: 50,
    }

    const result = convertFoodMacronutrientsToBase(food, 25)

    expect(result).toEqual({
      id: 1,
      name: 'Arroz',
      unit: UnitTypes.Grams,
      calories: 100,
      carbohydrates: 25,
      proteins: 2,
      fats: 0.5,
      fibers: 1,
      sodium: 0.25,
      quantity: 25,
    })
  })

  it('should return the same values ​​when the quantity and the desired base are equal', () => {
    const food: FoodWithQuantity = {
      id: 2,
      name: 'Feijão',
      unit: UnitTypes.Grams,
      calories: 300,
      carbohydrates: 60,
      proteins: 20,
      fats: 5,
      fibers: 15,
      sodium: 1,
      quantity: 100,
    }

    const result = convertFoodMacronutrientsToBase(food, 100)

    expect(result).toEqual(food)
  })

  it('should handle with decimal values correctly', () => {
    const food: FoodWithQuantity = {
      id: 3,
      name: 'Leite',
      unit: UnitTypes.Mililiters,
      calories: 42,
      carbohydrates: 5,
      proteins: 3,
      fats: 1,
      fibers: 0,
      sodium: 0.1,
      quantity: 0.5,
    }

    const result = convertFoodMacronutrientsToBase(food, 0.25)

    expect(result).toEqual({
      id: 3,
      name: 'Leite',
      unit: UnitTypes.Mililiters,
      calories: 21,
      carbohydrates: 2.5,
      proteins: 1.5,
      fats: 0.5,
      fibers: 0,
      sodium: 0.05,
      quantity: 0.25,
    })
  })

  it('should handle with extreme quantity values correctly', () => {
    const food: FoodWithQuantity = {
      id: 5,
      name: 'Queijo',
      unit: UnitTypes.Grams,
      calories: 400,
      carbohydrates: 1,
      proteins: 25,
      fats: 33,
      fibers: 0,
      sodium: 2.5,
      quantity: 1000,
    }

    const result = convertFoodMacronutrientsToBase(food, 10000)

    expect(result).toEqual({
      id: 5,
      name: 'Queijo',
      unit: UnitTypes.Grams,
      calories: 4000,
      carbohydrates: 10,
      proteins: 250,
      fats: 330,
      fibers: 0,
      sodium: 25,
      quantity: 10000,
    })
  })

  it('should handle correctly with values equal zero', () => {
    const food: FoodWithQuantity = {
      id: 5,
      name: 'Queijo',
      unit: UnitTypes.Grams,
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      fibers: 0,
      sodium: 0,
      quantity: 0,
    }

    const result = convertFoodMacronutrientsToBase(food, 10000)

    expect(result).toEqual(food)
  })
})
