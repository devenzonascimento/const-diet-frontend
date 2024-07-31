interface PlanData {
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  cycleRoutineIds: string[];
}

export function formatPlanData(planData: PlanData) {
  const { cycleRoutineIds, ...plan } = planData

  plan.startDate.setHours(0,0,0,0)
  plan.endDate.setHours(0,0,0,0)

  const dates = generateDates(planData.startDate, planData.endDate);

  const routines = assignRoutinesToDates(dates, cycleRoutineIds);

  return {
    ...plan,    
    routines: routines
  };
}

function generateDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];

  const currentDate = new Date(startDate);  
  currentDate.setHours(0, 0, 0, 0);
  
  const finalDate = new Date(endDate);  
  finalDate.setHours(0, 0, 0, 0);

  while (currentDate <= finalDate) {    
    dates.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

function assignRoutinesToDates(dates: Date[], cycleRoutineIds: string[]) {
  const assignments: { routineId: string; date: Date }[] = [];

  for (let i = 0; i < dates.length; i++) {
    const routineId = cycleRoutineIds[i % cycleRoutineIds.length];
    
    assignments.push({ routineId, date: dates[i] });
  }
  
  return assignments;
}
