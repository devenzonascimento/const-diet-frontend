import { createContext, ReactNode, useContext, useReducer } from 'react';
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
  nameValue: string
  setNameValue: (value: string) => void
  waterValue: string
  setWaterValue: (value: string) => void
  meals: RoutineMeal[]
  addMeal: (newMeal: RoutineMeal) => void;
  removeMeal: (mealToRemove: RoutineMeal) => void;
  setRoutineData: (routine: CreateRoutine) => void;
  clearRoutineData: () => void;
  handleCreateRoutine: (redirect: () => void) => void;
  handleUpdateRoutine: (routineId: string, redirect: () => void) => void;
  deleteRoutineFn: UseMutateAsyncFunction<boolean, Error, string, unknown>

  createRoutineStates: MutationStates
  updateRoutineStates: MutationStates
}

interface RoutineState {
  name: string;
  water: string;
  meals: RoutineMeal[];
}

const initialState: RoutineState = {
  name: "",
  water: "",
  meals: []
};

type Action =
  | { type: 'SET_ROUTINE_DATA'; payload: CreateRoutine }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_WATER'; payload: string }
  | { type: 'SET_MEALS'; payload: RoutineMeal[] }
  | { type: 'ADD_MEAL'; payload: RoutineMeal }
  | { type: 'REMOVE_MEAL'; payload: RoutineMeal }

const routineReducer = (state: RoutineState, action: Action): RoutineState => {
  switch (action.type) {
    case 'SET_ROUTINE_DATA':
      return action.payload
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_WATER':
      return { ...state, water: action.payload };
    case 'SET_MEALS':
      return { ...state, meals: action.payload };
    case 'ADD_MEAL': {

      const newMeal = action.payload

      const existMealAtTheSameTime = state.meals.find(meal => {
        return meal.meal.id === newMeal.meal.id && meal.time === newMeal.time
      })

      if (existMealAtTheSameTime) {
        return state
      }

      const meals = [...state.meals, { ...newMeal }]

      return { ...state, meals };
    }
    case 'REMOVE_MEAL': {

      const mealToRemove = action.payload

      const newMeals = state.meals.filter(meal => {
        return !(meal.time === mealToRemove.time && meal.meal.id === mealToRemove.meal.id)
      })

      return { ...state, meals: newMeals }
    }
    default:
      return state;
  }
};

export const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(routineReducer, initialState);

  const clearRoutineData = () => {
    dispatch({ type: "SET_ROUTINE_DATA", payload: initialState })
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

    const meals = state.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
      }
    })

    await createRoutineMutation.mutateAsync({
      name: state.name,
      water: Number(state.water),
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

    const meals = state.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
      }
    })

    await updateRoutineMutation.mutateAsync({
      id: routineId,
      name: state.name,
      water: Number(state.water),
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
      nameValue: state.name,
      setNameValue: (value: string) => dispatch({ type: 'SET_NAME', payload: value }),
      waterValue: state.water,
      setWaterValue: (value: string) => dispatch({ type: 'SET_WATER', payload: value }),
      meals: state.meals,
      addMeal: (newMeal: RoutineMeal) => dispatch({ type: "ADD_MEAL", payload: newMeal }),
      removeMeal: (mealToRemove: RoutineMeal) => dispatch({ type: "REMOVE_MEAL", payload: mealToRemove }),
      setRoutineData: (routine: CreateRoutine) => dispatch({ type: "SET_ROUTINE_DATA", payload: routine }),
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