import { DailyMeal } from '@/types/types';
import { createContext, useState, ReactNode, useContext } from 'react';

interface CreateRoutine {
  name: string;
  meals: DailyMeal[];
}

interface RoutineContextType {
  routine: CreateRoutine;
  addMeal: (newMeal: DailyMeal) => void;
  onRoutineNameChange: (name: string) => void;
}

export const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {
  const [routine, setRoutine] = useState<CreateRoutine>({ name: "", meals: [] });

  const addMeal = (newMeal: DailyMeal) => {
    setRoutine({ ...routine, meals: [...routine.meals, {...newMeal, status: 'PENDING'}] });
  }

  const onRoutineNameChange = (name: string) => {
    setRoutine({ ...routine, name });
  }

  return (
    <RoutineContext.Provider value={{ routine, addMeal, onRoutineNameChange }}>
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