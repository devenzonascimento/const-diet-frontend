import { describe, it, expect } from 'vitest'
import { convertFoodMacronutrientsToBase } from './convert-food-macronutrients-to-base'
import { FoodWithQuantity } from '@/types/food-types'

describe('convertFoodMacronutrientsToBase', () => {
  it('deve converter corretamente os valores baseados na quantidade', () => {
    const food: FoodWithQuantity = {
      id: 1,
      name: 'Arroz',
      unit: 'GRAMS',
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
      unit: 'GRAMS',
      calories: 100,
      carbohydrates: 25,
      proteins: 2,
      fats: 0.5,
      fibers: 1,
      sodium: 0.25,
      quantity: 25,
    })
  })

  it('deve retornar os mesmos valores quando a quantidade e a base desejada forem iguais', () => {
    const food: FoodWithQuantity = {
      id: 2,
      name: 'Feijão',
      unit: 'GRAMS',
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

  it('deve lidar com valores de quantidade menores que 1', () => {
    const food: FoodWithQuantity = {
      id: 3,
      name: 'Leite',
      unit: 'MILILITERS',
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
      unit: 'MILILITERS',
      calories: 21,
      carbohydrates: 2.5,
      proteins: 1.5,
      fats: 0.5,
      fibers: 0,
      sodium: 0.05,
      quantity: 0.25,
    })
  })

  it('deve lidar com valores extremos na quantidade', () => {
    const food: FoodWithQuantity = {
      id: 5,
      name: 'Queijo',
      unit: 'GRAMS',
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
      unit: 'GRAMS',
      calories: 4000,
      carbohydrates: 10,
      proteins: 250,
      fats: 330,
      fibers: 0,
      sodium: 25,
      quantity: 10000,
    })
  })
})
