import { CreateFood, Food } from "@/types/types";

export const convertToBase100 = (foodData: CreateFood): Omit<Food, "id"> => {

  const multiplier = (100 / foodData.quantity)

  return {
    name: foodData.name,
    unit: foodData.unit,
    calories: foodData.calories * multiplier,
    carbohydrates: foodData.carbohydrates * multiplier,
    proteins: foodData.proteins * multiplier,
    fats: foodData.fats * multiplier,
    sodiums: foodData.sodiums * multiplier,
    fibers: foodData.fibers * multiplier,
  }
}