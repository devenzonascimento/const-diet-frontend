import { createRoutine } from '@/services/http/routine/create-routine';
import { DailyMeal } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { createContext, useState, ReactNode, useContext } from 'react';

interface CreateRoutine {
  name: string;
  meals: DailyMeal[];
}

interface RoutineContextType {
  routine: CreateRoutine;
  addMeal: (newMeal: DailyMeal) => void;
  onRoutineNameChange: (name: string) => void;
  handleCreateRoutine: () => void;
}

export const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {
  const [routine, setRoutine] = useState<CreateRoutine>({ name: "", meals: [] });

  const addMeal = (newMeal: DailyMeal) => {
    setRoutine({ ...routine, meals: [...routine.meals, { ...newMeal, status: 'PENDING' }] });
  }

  const onRoutineNameChange = (name: string) => {
    setRoutine({ ...routine, name });
  }


  const { mutateAsync: createRoutineFn } = useMutation({
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

    await createRoutineFn({
      name: routine.name,
      meals: meals
    });

    setRoutine({ name: "", meals: [] });
  }

  return (
    <RoutineContext.Provider value={{
      routine,
      addMeal,
      onRoutineNameChange,
      handleCreateRoutine
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