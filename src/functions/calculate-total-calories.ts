import { MealFood } from "@/types/types"

export const calculateTotalCalories = (foods: MealFood[] | undefined) => {
  let totalCalories = 0

  foods?.forEach((item) => {
    const foodCalories = item.quantity * item.food.calories / 100
    totalCalories += foodCalories
  })

  return totalCalories;
}