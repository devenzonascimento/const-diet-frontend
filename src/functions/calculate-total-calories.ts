import { MealFood } from "@/types/types";

export const calculateTotalCalories = (foods: MealFood[] | undefined) => {
  let calories = 0;

  foods?.forEach((item) => {
    const foodCalories = (item.quantity * item.food.calories) / 100;
    calories += foodCalories;
  });

  return calories;
};
