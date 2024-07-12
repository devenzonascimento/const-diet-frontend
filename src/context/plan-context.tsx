import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { createPlan } from '@/services/http/plan/create-plan';

import { addDays, addMonths, compareAsc } from 'date-fns';
import { formatPlanData } from '@/functions/format-plan-data';

import { Routine } from '@/types/types';

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
  setRoutinesCycle: (routines: (Routine | undefined)[]) => void
  isCycleDefined: boolean
  setIsCycleDefined: () => void
  isFormComplete: boolean
  addRoutine: (routine: Routine, slot: number) => void
  removeRoutine: (slot: number) => void
  handleCreatePlan: () => void;
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
  | { type: 'SET_ROUTINES_CYCLE'; payload: (Routine | undefined)[] }
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

  const [isCycleDefined, setIsCycleDefined] = useState<boolean>(false)

  const [isFormComplete, setIsFormComplete] = useState<boolean>(false)

  useEffect(() => {
    if (isCycleDefined && state.name !== "" && state.goal !== "") {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [state, isCycleDefined])

  const createPlanMutation = useMutation({
    mutationKey: ["create-plan"],
    mutationFn: createPlan
  })

  const handleCreatePlan = async () => {
    const { name, goal, startDate, endDate, routinesCycle } = state

    const routines = routinesCycle.filter(routineCycle => routineCycle != undefined)

    const planData = formatPlanData({
      name,
      goal,
      startDate,
      endDate,
      routines: routines
    })

    console.log(planData)
    return
    createPlanMutation.mutateAsync(planData)
  }

  const validateStartDate = (date: Date) => {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (compareAsc(currentDate, date) === 1) {

      alert("Erro: A data selecionada não pode ser anterior à data de hoje. Por favor, escolha uma data futura ou a data de hoje.")

      return;
    }

    dispatch({ type: 'SET_START_DATE', payload: date })

    if (compareAsc(date, state.endDate) === 1) {
      dispatch({ type: 'SET_END_DATE', payload: addDays(date, 1) })
    }
  }

  const validateEndDate = (date: Date) => {

    if (compareAsc(state.startDate, date) === 1) {

      alert("Erro: A data selecionada não pode ser anterior à data de início. Por favor, escolha uma data futura ou a data de hoje.")

      return;
    }

    dispatch({ type: 'SET_END_DATE', payload: date })
  }

  return (
    <PlanContext.Provider value={{
      nameValue: state.name,
      setNameValue: (value: string) => dispatch({ type: 'SET_NAME', payload: value }),
      goalValue: state.goal,
      setGoalValue: (value: string) => dispatch({ type: 'SET_GOAL', payload: value }),
      startDateValue: state.startDate,
      setStartDateValue: validateStartDate,
      endDateValue: state.endDate,
      setEndDateValue: validateEndDate,
      routinesCycle: state.routinesCycle,
      setRoutinesCycle: (routines: (Routine | undefined)[]) => dispatch({ type: 'SET_ROUTINES_CYCLE', payload: routines }),
      isCycleDefined,
      setIsCycleDefined: () => setIsCycleDefined(!isCycleDefined),
      isFormComplete,
      addRoutine: (routine: Routine, slot: number) => dispatch({ type: 'ADD_ROUTINE', payload: { routine, slot } }),
      removeRoutine: (slot: number) => dispatch({ type: 'REMOVE_ROUTINE', payload: slot }),
      handleCreatePlan,
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
