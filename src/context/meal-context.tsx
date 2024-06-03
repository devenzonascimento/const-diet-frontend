import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

import { createMeal } from '@/services/http/meal/create-meal';

import { Meal, MealFood } from '@/types/types';
import { getFoodsFromMeal } from '@/services/http/food/get-foods-from-meal';
import { getMeal } from '@/services/http/meal/get-meal';
import { updateMeal } from '@/services/http/meal/update-meal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MealContextType {
  mealName: string
  handleInputValue: (inputValue: string) => void
  foods: MealFood[]
  addFoodToFoodList: (food: MealFood) => void
  removeFoodFromFoodList: (foodId: string) => void
  handleCreateMeal: () => void
  handleUpdateMeal: () => void
  loadMealById: (mealId: string) => void
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

  const handleCreateMeal = async () => {

    await createMealFn({
      name: mealName,
      foods: foods.map(({ food, quantity, unit }) => {
        return {
          foodId: food.id,
          quantity: Number(quantity),
          unit
        }
      })
    })

    setFoods([])
    setMealName("")
  }

  const handleUpdateMeal = () => {

    if (mealName == "" || foods.length == 0) {
      return
    }

    updateMeal({
      mealId,
      mealName,
      foods: foods.map((foodItem) => {
        return {
          foodId: foodItem.food.id,
          quantity: Number(foodItem.quantity),
          unit: foodItem.unit
        }
      })
    })

    setFoods([])
    setMealName("")
  }




  const loadMealById = (mealId: string) => {
    setMealId(mealId)
  }

  const loadMealData = useCallback(async () => {
    if (mealId) {
      const foodsInMeal = await getFoodsFromMeal(mealId);
      if (foodsInMeal) {
        setFoods(foodsInMeal);
      }

      const meal = await getMeal(mealId);
      if (meal) {
        setMealName(meal.name);
      }
    }
  }, [mealId]);

  useEffect(() => {
    loadMealData();
  }, [mealId, loadMealData]);

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
      handleUpdateMeal,
      loadMealById,
    }}>
      {children}
    </MealContext.Provider>
  );
};
