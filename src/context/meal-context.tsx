import { createContext, useState, ReactNode } from 'react';

import { createMeal } from '@/services/http/meal/create-meal';

import { MealFood } from '@/types/types';

interface MealContextType {
  mealName: string
  handleInputValue: (inputValue: string) => void
  foods: MealFood[]
  addFoodToFoodList: (food: MealFood) => void
  removeFoodFromFoodList: (foodId: string) => void
  handleCreateMeal: () => void
}

export const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: ReactNode }) => {

  const [mealName, setMealName] = useState<string>("")

  const [foods, setFoods] = useState<MealFood[]>([])

  const addFoodToFoodList = (food: MealFood) => {

    const existsInFoods = foods.find((foodItem) => {
      return foodItem.food.id == food.food.id
    })

    if (!existsInFoods) {
      setFoods([...foods, food])
    }
  }

  const removeFoodFromFoodList = (foodId: string) => {
    const newFoods = foods.filter((food) => {
      return food.food.id !== foodId
    })

    setFoods([...newFoods])
  }

  const handleCreateMeal = () => {

    if (mealName == "" || foods.length == 0) {
      return
    }

    createMeal({
      name: mealName,
      foods: foods.map((foodItem) => {
        return {
          foodId: foodItem.food.id,
          quantity: Number(foodItem.quantity),
          unit: foodItem.unit
        }
      })
    })
  }

  const handleInputValue = (inputValue: string) => {
    setMealName(inputValue)
  }

  return (
    <MealContext.Provider value={{
      mealName, 
      handleInputValue,
      foods,
      addFoodToFoodList,
      removeFoodFromFoodList,
      handleCreateMeal,
      
    }}>
      {children}
    </MealContext.Provider>
  );
};
