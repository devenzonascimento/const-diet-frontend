import { createContext, useState, ReactNode, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMeal } from '@/services/http/meal/create-meal';
import { updateMeal } from '@/services/http/meal/update-meal';

import { Meal, MealFood } from '@/types/types';

interface MealContextType {
  mealName: string
  handleInputMealName: (inputValue: string) => void
  foods: MealFood[]
  addFoodToFoodList: (food: MealFood) => void
  removeFoodFromFoodList: (foodId: string) => void
  handleCreateMeal: () => void
  handleUpdateMeal: () => void
  loadMealData: (mealData: Meal) => void
  clearContext: () => void
}

export const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: ReactNode }) => {

  const [mealId, setMealId] = useState<string>("")

  const [mealName, setMealName] = useState<string>("")

  const [foods, setFoods] = useState<MealFood[]>([])

  const addFoodToFoodList = (food: MealFood) => {

    const existsInFoods = foods.find((foodItem) => {
      return foodItem.food.id == food.food.id
    })

    if (!existsInFoods) {
      setFoods([...foods, food])

    } else {
      const newFoods = foods.map((foodItem) => {
        return foodItem.food.id === food.food.id 
        ? 
        { ...foodItem, quantity: Number(foodItem.quantity) + Number(food.quantity) } 
        : 
        foodItem
      })

      setFoods([...newFoods])
    }
  }

  const removeFoodFromFoodList = (foodId: string) => {
    const newFoods = foods.filter((foodItem) => {
      return foodItem.food.id !== foodId
    })

    setFoods([...newFoods])
  }

  const queryClient = useQueryClient()

  const { mutateAsync: createMealFn } = useMutation({
    mutationFn: createMeal,
    onSuccess() {
      queryClient.setQueryData(
        ["mealsList"],
        (data: Meal[]) => [...data, { id: crypto.randomUUID(), name: mealName, foods: foods }]
      )
    },
  })

  const { mutateAsync: updateMealFn } = useMutation({
    mutationFn: updateMeal,
    onSuccess() {
      queryClient.setQueryData(
        ["mealsList"],
        (data: Meal[]) => data?.map((mealItem) => {
          return mealItem.id === mealId
          ?
          { 
            id: mealId,
            name: mealName,
            foods: foods
          }
          :
          mealItem
        })
      )
    },
  })

  const handleCreateMeal = async () => {

    await createMealFn({
      name: mealName,
      foods: foods.map(({ food, quantity }) => {
        return {
          foodId: food.id,
          quantity: Number(quantity),
        }
      })
    })

    setFoods([])
    setMealName("")
  }

  const handleUpdateMeal = async () => {

    if (mealName == "" || foods.length == 0) {
      return
    }

    await updateMealFn({
      mealId,
      mealName,
      foods: foods.map(({ food, quantity }) => {
        return {
          foodId: food.id,
          quantity: Number(quantity),
        }
      })
    })
  }

  const loadMealData = (mealData: Meal) => {
    setMealId(mealData.id)
    setMealName(mealData.name)
    setFoods(mealData.foods)
  }

  const clearContext = () => {
    setMealName("")
    setFoods([])
  }

  const handleInputMealName = (inputValue: string) => {
    setMealName(inputValue)
  }

  return (
    <MealContext.Provider value={{
      mealName,
      handleInputMealName,
      foods,
      addFoodToFoodList,
      removeFoodFromFoodList,
      handleCreateMeal,
      handleUpdateMeal,
      loadMealData,
      clearContext
    }}>
      {children}
    </MealContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
};