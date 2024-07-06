import { Routine } from '@/types/types';
import { addMonths } from 'date-fns';
import { createContext, ReactNode, useContext, useReducer } from 'react';

interface PlanContextType {
  nameValue: string
  setNameValue: (value: string) => void
  goalValue: string
  setGoalValue: (value: string) => void
  startDateValue: Date
  setStartDateValue: (date: Date) => void
  endDateValue: Date
  setEndDateValue: (date: Date) => void
  routinesCycle: (Routine | undefined)[];
  setRoutinesCycle: (routines: Routine[]) => void
  addRoutine: (routine: Routine, slot: number) => void
  removeRoutine: (slot: number) => void
}

interface PlanState {
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  routinesCycle: (Routine | undefined)[];
}

const initialState: PlanState = {
  name: "",
  goal: "",
  startDate: new Date(),
  endDate: addMonths(new Date(), 1),
  routinesCycle: [],
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_GOAL'; payload: string }
  | { type: 'SET_START_DATE'; payload: Date }
  | { type: 'SET_END_DATE'; payload: Date }
  | { type: 'SET_ROUTINES_CYCLE'; payload: Routine[] }
  | { type: 'ADD_ROUTINE'; payload: { routine: Routine, slot: number } }
  | { type: 'REMOVE_ROUTINE'; payload: number }

const planReducer = (state: PlanState, action: Action): PlanState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_GOAL':
      return { ...state, goal: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_ROUTINES_CYCLE':
      return { ...state, routinesCycle: action.payload };
    case 'ADD_ROUTINE': {
      const slot = action.payload.slot
      const routine = action.payload.routine

      const newRoutinesCycle = state.routinesCycle
      newRoutinesCycle[slot] = routine

      return { ...state, routinesCycle: newRoutinesCycle };
    }
    case 'REMOVE_ROUTINE': {
      const slot = action.payload      

      const newRoutinesCycle = state.routinesCycle.map((item, index) => {        
        return index !== slot ? item : undefined
      })

      return { ...state, routinesCycle: newRoutinesCycle };
    }
    default:
      return state;
  }
};

export const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(planReducer, initialState);



  return (
    <PlanContext.Provider value={{
      nameValue: state.name,
      setNameValue: (value: string) => dispatch({ type: 'SET_NAME', payload: value }),
      goalValue: state.goal,
      setGoalValue: (value: string) => dispatch({ type: 'SET_GOAL', payload: value }),
      startDateValue: state.startDate,
      setStartDateValue: (date: Date) => dispatch({ type: 'SET_START_DATE', payload: date }),
      endDateValue: state.endDate,
      setEndDateValue: (date: Date) => dispatch({ type: 'SET_END_DATE', payload: date }),
      routinesCycle: state.routinesCycle,
      setRoutinesCycle: (routines: Routine[]) => dispatch({ type: 'SET_ROUTINES_CYCLE', payload: routines }),
      addRoutine: (routine: Routine, slot: number) => dispatch({ type: 'ADD_ROUTINE', payload: { routine, slot } }),
      removeRoutine: (slot: number) => dispatch({ type: 'REMOVE_ROUTINE', payload: slot }),
    }}>
      {children}
    </PlanContext.Provider>
  );
};











// eslint-disable-next-line react-refresh/only-export-components
export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlanContext must be used within a PlanProvider');
  }
  return context;
};

function generateDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function assignRoutinesToDates(dates: Date[], cycle: string[]): { routineId: string; date: Date }[] {
  const assignments: { routineId: string; date: Date }[] = [];

  for (let i = 0; i < dates.length; i++) {
    const routineId = cycle[i % cycle.length];
    assignments.push({ routineId, date: dates[i] });
  }

  return assignments;
}

function createPlan(name: string, goal: string, startDate: Date, endDate: Date, cycle: string[]): PlanCreate {
  const dates = generateDates(startDate, endDate);
  const routineAssignments = assignRoutinesToDates(dates, cycle);

  const routinesMap: { [key: string]: Date[] } = {};

  routineAssignments.forEach(({ routineId, date }) => {
    if (!routinesMap[routineId]) {
      routinesMap[routineId] = [];
    }
    routinesMap[routineId].push(date);
  });

  const routines = Object.entries(routinesMap).map(([routineId, dates]) => ({
    routineId,
    date: dates,
  }));

  return {
    name,
    goal,
    startDate,
    endDate,
    routines,
  };
}


const everyDay = ["R1"]
const alternated = ["R1", "R2"]
const weekly = ["R1", "R2", "R3", "R4", "R5", "R6", "R7"]
const custom = ["R1", "R2", "R3", "R4"]