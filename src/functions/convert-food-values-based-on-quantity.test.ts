import { describe, it, expect } from 'vitest'
import { convertFoodValuesBasedOnQuantity } from './convert-food-values-based-on-quantity'

describe('(PureFunction) convertFoodValuesBasedOnQuantity', () => {
  it('should convert values correctly based on quantity', () => {
    expect(
      convertFoodValuesBasedOnQuantity({
        currentQuantity: 50,
        desiredQuantity: 25,
        stats: {
          calories: 200,
          carbohydrates: 50,
          proteins: 4,
          fats: 1,
          fibers: 2,
          sodium: 0.5,
        },
      }),
    ).toEqual({
      calories: 100,
      carbohydrates: 25,
      proteins: 2,
      fats: 0.5,
      fibers: 1,
      sodium: 0.25,
    })
  })

  it('should return the same values ​​when the quantity and the desired base are equal', () => {
    expect(
      convertFoodValuesBasedOnQuantity({
        currentQuantity: 100,
        desiredQuantity: 100,
        stats: {
          calories: 300,
          carbohydrates: 60,
          proteins: 20,
          fats: 5,
          fibers: 15,
          sodium: 1,
        },
      }),
    ).toEqual({
      calories: 300,
      carbohydrates: 60,
      proteins: 20,
      fats: 5,
      fibers: 15,
      sodium: 1,
    })
  })

  it('should handle with decimal values correctly', () => {
    expect(
      convertFoodValuesBasedOnQuantity({
        currentQuantity: 0.5,
        desiredQuantity: 0.25,
        stats: {
          calories: 42,
          carbohydrates: 5,
          proteins: 3,
          fats: 1,
          fibers: 0,
          sodium: 0.1,
        },
      }),
    ).toEqual({
      calories: 21,
      carbohydrates: 2.5,
      proteins: 1.5,
      fats: 0.5,
      fibers: 0,
      sodium: 0.05,
    })
  })

  it('should handle with extreme quantity values correctly', () => {
    expect(
      convertFoodValuesBasedOnQuantity({
        currentQuantity: 1000,
        desiredQuantity: 10000,
        stats: {
          calories: 400,
          carbohydrates: 1,
          proteins: 25,
          fats: 33,
          fibers: 0,
          sodium: 2.5,
        },
      }),
    ).toEqual({
      calories: 4000,
      carbohydrates: 10,
      proteins: 250,
      fats: 330,
      fibers: 0,
      sodium: 25,
    })
  })

  it('should handle correctly with values equal zero', () => {
    expect(
      convertFoodValuesBasedOnQuantity({
        currentQuantity: 0,
        desiredQuantity: 10000,
        stats: {
          calories: 0,
          carbohydrates: 0,
          proteins: 0,
          fats: 0,
          fibers: 0,
          sodium: 0,
        },
      }),
    ).toEqual({
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      fibers: 0,
      sodium: 0,
    })
  })
})
