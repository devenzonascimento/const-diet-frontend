// FoodContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

import { createMeal } from '@/services/http/meal/create-meal';

import { MealFood } from '@/types/types';

interface NewMealContextType {
  mealName: string
  handleInputValue: (inputValue: string) => void
  foods: MealFood[]
  addFoodToFoodList: (food: MealFood) => void
  removeFoodFromFoodList: (foodId: string) => void
  handleCreateMeal: () => void
}

const NewMealContext = createContext<NewMealContextType | undefined>(undefined);

export const NewMealProvider = ({ children }: { children: ReactNode }) => {

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
    <NewMealContext.Provider value={{
      mealName, 
      handleInputValue,
      foods,
      addFoodToFoodList,
      removeFoodFromFoodList,
      handleCreateMeal,
      
    }}>
      {children}
    </NewMealContext.Provider>
  );
};

export const useNewMealContext = () => {
  const context = useContext(NewMealContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};