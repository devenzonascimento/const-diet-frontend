import { Plan, Routine } from "@/types/types";

export function formatPlanData(planData: Plan) {
  const dates = generateDates(planData.startDate, planData.endDate);
  const routineAssignments = assignRoutinesToDates(dates, planData.routines);

  const routinesMap: { [key: string]: Date[] } = {};

  routineAssignments.forEach(({ routineId, date }) => {
    if (!routinesMap[routineId]) {
      routinesMap[routineId] = [];
    }
    routinesMap[routineId].push(date);
  });

  const routines = Object.entries(routinesMap).map(([routineId, dates]) => ({
    routineId,
    dates: dates,
  }));

  return {
    ...planData,    
    routines: routines
  };
}

function generateDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function assignRoutinesToDates(dates: Date[], cycle: Routine[]) {
  const assignments: { routineId: string; date: Date }[] = [];

  for (let i = 0; i < dates.length; i++) {
    const routineId = cycle[i % cycle.length].id;
    assignments.push({ routineId, date: dates[i] });
  }

  return assignments;
}
