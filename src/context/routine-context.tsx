import { createContext, useState, ReactNode, useContext } from 'react';
import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';

import { createRoutine } from '@/services/http/routine/create-routine';
import { deleteRoutine } from '@/services/http/routine/delete-routine';
import { updateRoutine } from '@/services/http/routine/update-routine';

import { RoutineMeal, Routine } from '@/types/types';

interface CreateRoutine {
  name: string;
  water: string;
  meals: RoutineMeal[];
}

interface MutationStates {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface RoutineContextType {
  routine: CreateRoutine;
  addMeal: (newMeal: RoutineMeal) => void;
  removeMeal: (mealToRemove: RoutineMeal) => void;
  onRoutineNameChange: (name: string) => void;
  onRoutineWaterChange: (water: string) => void;
  setRoutineData: (routine: CreateRoutine) => void;
  clearRoutineData: () => void;
  handleCreateRoutine: (redirect: () => void) => void;
  handleUpdateRoutine: (routineId: string, redirect: () => void) => void;
  deleteRoutineFn: UseMutateAsyncFunction<boolean, Error, string, unknown>

  createRoutineStates: MutationStates
  updateRoutineStates: MutationStates
}



export const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {
  const [routine, setRoutine] = useState<CreateRoutine>({ name: "", water: "", meals: [] });

  const addMeal = (newMeal: RoutineMeal) => {
    const existMealAtTheSameTime = routine.meals.find(meal => {
      return meal.time === newMeal.time && meal.meal.id === newMeal.meal.id
    })

    if (existMealAtTheSameTime) {
      return
    }

    setRoutine({ ...routine, meals: [...routine.meals, { ...newMeal }] });
  }

  const removeMeal = (mealToRemove: RoutineMeal) => {
    const newMeals = routine.meals.filter(meal => {
      return !(meal.time === mealToRemove.time && meal.meal.id === mealToRemove.meal.id)
    })

    setRoutine({ ...routine, meals: newMeals });
  }

  const onRoutineNameChange = (name: string) => {
    setRoutine({ ...routine, name });
  }

  const onRoutineWaterChange = (water: string) => {
    setRoutine({ ...routine, water });
  }

  const setRoutineData = (routine: CreateRoutine) => {
    if (routine) {
      setRoutine({
        name: routine.name,
        water: routine.water,
        meals: routine.meals
      })
    }
  }

  const clearRoutineData = () => {
    setRoutine({ name: "", water: "", meals: [] });
  }

  const queryClient = useQueryClient()

  const createRoutineMutation = useMutation({
    mutationKey: ["create-routine"],
    mutationFn: createRoutine,
    onSuccess(data) {
      queryClient.setQueryData(
        ["routinesList"],
        (routineList: Routine[]) => {
          return [...routineList, data]
        }
      )
    },
  })

  const handleCreateRoutine = async (redirect: () => void) => {

    const meals = routine.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
      }
    })

    await createRoutineMutation.mutateAsync({
      name: routine.name,
      water: Number(routine.water),
      meals: meals
    });

    clearRoutineData()
    redirect();
  }

  const createRoutineStates = {
    isPending: createRoutineMutation.isPending,
    isError: createRoutineMutation.isError,
    isSuccess: createRoutineMutation.isSuccess,
  }

  const updateRoutineMutation = useMutation({
    mutationKey: ["update-routine"],
    mutationFn: updateRoutine,
    onSuccess(data) {
      queryClient.setQueryData(
        ["routinesList"],
        (routineList: Routine[]) => {
          return routineList.map((routine) => routine.id === data.id ? data : routine)
        }
      )
    },
  })

  const handleUpdateRoutine = async (routineId: string, redirect: () => void) => {

    const meals = routine.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
      }
    })

    await updateRoutineMutation.mutateAsync({
      id: routineId,
      name: routine.name,
      water: Number(routine.water),
      meals: meals
    });

    clearRoutineData()
    redirect();
  }

  const updateRoutineStates = {
    isPending: updateRoutineMutation.isPending,
    isError: updateRoutineMutation.isError,
    isSuccess: updateRoutineMutation.isSuccess,
  }

  const { mutateAsync: deleteRoutineFn } = useMutation({
    mutationKey: ["delete-routine"],
    mutationFn: deleteRoutine,
    onSuccess(_, routineId) {
      queryClient.setQueryData(
        ["routinesList"],
        (routineList: Routine[]) => {
          return routineList.filter(routine => routine.id !== routineId)
        }
      );
    },
  })

  return (
    <RoutineContext.Provider value={{
      routine,
      addMeal,
      removeMeal,
      onRoutineNameChange,
      onRoutineWaterChange,
      setRoutineData,
      clearRoutineData,
      handleCreateRoutine,
      handleUpdateRoutine,
      deleteRoutineFn,

      createRoutineStates,
      updateRoutineStates
    }}>
      {children}
    </RoutineContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoutineContext = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineContext must be used within a RoutineProvider');
  }
  return context;
};