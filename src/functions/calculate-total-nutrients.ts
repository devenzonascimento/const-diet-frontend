import { MealFood } from "@/types/types"

export const calculateTotalNutrients = (foods: MealFood[] | undefined) => {
  const totalNutrients = {
    "carbohydrates": 0,
    "proteins": 0,
    "fats": 0
  }

  foods?.forEach((item) => {

    const carbohydrates = item.quantity * item.food?.carbohydrates / 100
    const proteins = item.quantity * item.food?.proteins / 100
    const fats = item.quantity * item.food?.fats / 100

    totalNutrients["carbohydrates"] = totalNutrients["carbohydrates"] + carbohydrates
    totalNutrients["proteins"] = totalNutrients["proteins"] + proteins
    totalNutrients["fats"] = totalNutrients["fats"] + fats
  })

  return totalNutrients;
}