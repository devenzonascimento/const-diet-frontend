import { createRoutine } from '@/services/http/routine/create-routine';
import { updateRoutine } from '@/services/http/routine/update-routine';
import { DailyMeal } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { createContext, useState, ReactNode, useContext } from 'react';

interface CreateRoutine {
  name: string;
  water: string;
  meals: DailyMeal[];
}

interface MutationStates {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface RoutineContextType {
  routine: CreateRoutine;
  addMeal: (newMeal: DailyMeal) => void;
  onRoutineNameChange: (name: string) => void;
  onRoutineWaterChange: (water: string) => void;
  handleCreateRoutine: () => void;
  handleUpdateRoutine: (routineId: string) => void
  setRoutineData: (routine: CreateRoutine) => void

  createRoutineStates: MutationStates
  updateRoutineStates: MutationStates
}



export const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {
  const [routine, setRoutine] = useState<CreateRoutine>({ name: "", water: "", meals: [] });

  const addMeal = (newMeal: DailyMeal) => {
    setRoutine({ ...routine, meals: [...routine.meals, { ...newMeal, status: 'PENDING' }] });
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

  const createRoutineMutation = useMutation({
    mutationKey: ["create-routine"],
    mutationFn: createRoutine
  })

  const handleCreateRoutine = async () => {

    const meals = routine.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
        status: mealItem.status
      }
    })

    await createRoutineMutation.mutateAsync({
      name: routine.name,
      water: Number(routine.water),
      meals: meals
    });

    setRoutine({ name: "", water: "", meals: [] });
  }

  const createRoutineStates = {
    isPending: createRoutineMutation.isPending,
    isError: createRoutineMutation.isError,
    isSuccess: createRoutineMutation.isSuccess,
  }

  const updateRoutineMutation = useMutation({
    mutationKey: ["update-routine"],
    mutationFn: updateRoutine
  })

  const handleUpdateRoutine = async (routineId: string) => {

    const meals = routine.meals.map(mealItem => {
      return {
        mealId: mealItem.meal.id,
        time: mealItem.time,
        status: mealItem.status
      }
    })

    await updateRoutineMutation.mutateAsync({
      id: routineId,
      name: routine.name,
      water: Number(routine.water),
      meals: meals
    });

    setRoutine({ name: "", water: "", meals: [] });
  }

  const updateRoutineStates = {
    isPending: updateRoutineMutation.isPending,
    isError: updateRoutineMutation.isError,
    isSuccess: updateRoutineMutation.isSuccess,
  }

  return (
    <RoutineContext.Provider value={{
      routine,
      addMeal,
      onRoutineNameChange,
      onRoutineWaterChange,
      handleCreateRoutine,
      handleUpdateRoutine,
      setRoutineData,

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