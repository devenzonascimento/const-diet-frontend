import { useState } from "react";

import { isEqual } from "date-fns";

import { DailyRoutineItem } from "./daily-routine-item";

import { Plan } from "@/types/types";
import { SelectDayViewer } from "./select-day-viewer";

interface DayViewerProps {
  plan: Plan;
}

export const DayViewer = ({ plan }: DayViewerProps) => {

  const startDate = new Date(plan.startDate)

  startDate.setHours(0, 0, 0, 0)

  const [selectedDay, setSelectedDay] = useState<Date>(startDate);

  return (
    <>
      <SelectDayViewer
        date={selectedDay}
        setDate={setSelectedDay}
        setRange={{
          fromDate: plan?.startDate,
          toDate: plan?.endDate
        }}
      />
      {plan.routines.map(routine => {
        return isEqual(routine.date, selectedDay) ?
          <DailyRoutineItem key={routine.id} routine={routine} />
          :
          null
      })}
    </>
  );
}
