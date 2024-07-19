import { CreateFood } from "@/types/types";

export const convertFromBase100 = (foodData: CreateFood) => {
  const multiplier = foodData.quantity / 100;

  return {
    calories: foodData.calories * multiplier,
    carbohydrates: foodData.carbohydrates * multiplier,
    proteins: foodData.proteins * multiplier,
    fats: foodData.fats * multiplier,
    sodium: foodData.sodium * multiplier,
    fibers: foodData.fibers * multiplier,
  };
};
