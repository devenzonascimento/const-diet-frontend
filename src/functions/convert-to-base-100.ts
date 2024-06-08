import { CreateFood } from "@/types/types";

export const convertToBase100 = (foodData: CreateFood) => {

  const multiplier = (100 / foodData.quantity)

  return {
    ...foodData,
    calories: foodData.calories * multiplier,
    carbohydrates: foodData.carbohydrates * multiplier,
    proteins: foodData.proteins * multiplier,
    fats: foodData.fats * multiplier,
    sodiums: foodData.sodiums * multiplier,
    fibers: foodData.fibers * multiplier,
  }
}