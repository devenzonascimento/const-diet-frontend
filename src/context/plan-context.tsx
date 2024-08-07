import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { planService } from '@/services/http/plan/plan-service';

import { addDays, addMonths, compareAsc } from 'date-fns';
import { formatPlanData } from '@/functions/format-plan-data';

import { Plan, Routine } from '@/types/types';

interface MutationStates {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

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
  setPlanData: (plan: PlanState) => void
  isCycleDefined: boolean
  setIsCycleUndefined: () => void
  toggleCycleDefined: () => void
  isFormComplete: boolean
  addRoutine: (routine: Routine, slot: number) => void
  removeRoutine: (slot: number) => void
  handleCreatePlan: () => void;
  handleUpdatePlan: (planId: string) => void
  handleDeletePlan: (planId: string) => void
  

  createPlanMutation: MutationStates
  updatePlanMutation: MutationStates
  deletePlanMutation: MutationStates
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
  | { type: 'SET_PLAN_DATA'; payload: PlanState }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_GOAL'; payload: string }
  | { type: 'SET_START_DATE'; payload: Date }
  | { type: 'SET_END_DATE'; payload: Date }
  | { type: 'SET_ROUTINES_CYCLE'; payload: (Routine | undefined)[] }
  | { type: 'ADD_ROUTINE'; payload: { routine: Routine, slot: number } }
  | { type: 'REMOVE_ROUTINE'; payload: number }

const planReducer = (state: PlanState, action: Action): PlanState => {
  switch (action.type) {
    case 'SET_PLAN_DATA':
      return action.payload
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

  const queryClient = useQueryClient()
  
  const navigate = useNavigate()

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
    mutationFn: planService.create,
    onSuccess(createdPlan) {
      queryClient.setQueryData(
        ["plansList"],
        (plansList: Plan[]) => {
          return [createdPlan, ...plansList]
        }
      )
    },
  })

  const handleCreatePlan = async () => {
    const { name, goal, startDate, endDate, routinesCycle } = state

    const cycleRoutineIds = routinesCycle.filter(routineCycle => routineCycle != undefined).map(routine => routine.id)

    const planData = formatPlanData({
      name,
      goal,
      startDate,
      endDate,
      cycleRoutineIds
    })

    await createPlanMutation.mutateAsync(planData)

    navigate("/meus-planos")
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

  
  const updatePlanMutation = useMutation({
    mutationKey: ["update-plan"],
    mutationFn: planService.update,
    onSuccess(updatedPlan) {
      queryClient.setQueryData(
        ["plansList"],
        (plansList: Plan[]) => {
          return plansList.map(plan => {

            if (plan.id === updatedPlan.id) {
              return {
                id: updatedPlan.id,
                name: updatedPlan.name,
                goal: updatedPlan.goal,
                startDate: updatedPlan.startDate,
                endDate: updatedPlan.endDate,
              }
            }

            return plan
          })
        }
      )
      queryClient.setQueryData(
        [`plan-${updatedPlan.id}`],
        () => updatedPlan
      )
    },
  })
 
  const handleUpdatePlan = async (planId: string) => {
    const { name, goal, startDate, endDate, routinesCycle } = state

    const cycleRoutineIds = routinesCycle.filter(routineCycle => routineCycle != undefined).map(routine => routine.id)

    const planData = formatPlanData({
      name,
      goal,
      startDate,
      endDate,
      cycleRoutineIds
    })

    await updatePlanMutation.mutateAsync({ id: planId, ...planData })

    navigate(`/detalhes-do-meu-plano/${planId}`)
  }

  const deletePlanMutation = useMutation({
    mutationKey: ["delete-plan"],
    mutationFn: planService.delete,
    onSuccess(_, deletedPlanId) {
      queryClient.setQueryData(
        ["plansList"],
        (plansList: Plan[]) => {
          return plansList.filter(plan => plan.id !== deletedPlanId)
        }
      )
    },
  })

  const handleDeletePlan = async (planId: string) => {
    await deletePlanMutation.mutateAsync(planId)

    navigate("/meus-planos")
  }

  return (
    <PlanContext.Provider value={{
      setPlanData: (plan: PlanState) => dispatch({ type: "SET_PLAN_DATA", payload: plan }),
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
      setIsCycleUndefined: () => setIsCycleDefined(false),
      toggleCycleDefined: () => setIsCycleDefined(!isCycleDefined),
      isFormComplete,
      addRoutine: (routine: Routine, slot: number) => dispatch({ type: 'ADD_ROUTINE', payload: { routine, slot } }),
      removeRoutine: (slot: number) => dispatch({ type: 'REMOVE_ROUTINE', payload: slot }),
      handleCreatePlan,
      handleUpdatePlan,
      handleDeletePlan,


      createPlanMutation,
      updatePlanMutation,
      deletePlanMutation
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
