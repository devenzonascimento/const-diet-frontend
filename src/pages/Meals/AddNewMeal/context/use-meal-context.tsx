import { useContext } from "react";
import { NewMealContext } from "./new-meal-context";

export const useNewMealContext = () => {
  const context = useContext(NewMealContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};
