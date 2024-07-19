import { createContext, useState, ReactNode, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMeal } from '@/services/http/meal/create-meal';
import { updateMeal } from '@/services/http/meal/update-meal';

import { Meal, MealFood } from '@/types/types';

interface MutationStates {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface MealContextType {
  mealName: string
  handleInputMealName: (inputValue: string) => void
  foods: MealFood[]
  addFoodToFoodList: (food: MealFood) => void
  removeFoodFromFoodList: (foodId: string) => void
  handleCreateMeal: (redirect: () => void) => void
  handleUpdateMeal: (redirect: () => void) => void
  setMealData: (mealData: Meal) => void
  clearContext: () => void

  createMealStates: MutationStates
  updateMealStates: MutationStates
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

  const clearMealData = () => {
    setFoods([])
    setMealName("")
  }

  const queryClient = useQueryClient()

  const createMealMutation = useMutation({
    mutationKey: ["create-meal"],
    mutationFn: createMeal,
    onSuccess(data) {
      queryClient.setQueryData(
        ["mealsList"],
        (mealsList: Meal[]) => {
          return [data, ...mealsList]
        }
      )
    },
  })

  const handleCreateMeal = async (redirect: () => void) => {

    if (mealName == "" || foods.length == 0) {
      return
    }

    await createMealMutation.mutateAsync({
      name: mealName,
      foods: foods.map(({ food, quantity }) => {
        return {
          foodId: food.id,
          quantity: Number(quantity),
        }
      })
    });

    clearMealData()
    redirect();
  }

  const createMealStates = {
    isPending: createMealMutation.isPending,
    isError: createMealMutation.isError,
    isSuccess: createMealMutation.isSuccess,
  }

  const updateMealMutation = useMutation({
    mutationKey: ["update-meal"],
    mutationFn: updateMeal,
    onSuccess(data) {
      queryClient.setQueryData(
        ["mealsList"],
        (mealsList: Meal[]) => {
          return mealsList.map((meal) => meal.id === data.id ? data : meal)
        }
      )
    },
  })

  const handleUpdateMeal = async (redirect: () => void) => {

    if (mealName == "" || foods.length == 0) {
      return
    }

    await updateMealMutation.mutateAsync({
      mealId,
      name: mealName,
      foods: foods.map(({ food, quantity }) => {
        return {
          foodId: food.id,
          quantity: Number(quantity),
        }
      })
    });

    clearMealData()
    redirect();
  }

  const updateMealStates = {
    isPending: updateMealMutation.isPending,
    isError: updateMealMutation.isError,
    isSuccess: updateMealMutation.isSuccess,
  }

  const setMealData = (mealData: Meal) => {
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
      setMealData,
      clearContext,

      createMealStates,
      updateMealStates,
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