import { useContext } from "react";
import { MealContext } from "@/context/meal-context";


export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
};
