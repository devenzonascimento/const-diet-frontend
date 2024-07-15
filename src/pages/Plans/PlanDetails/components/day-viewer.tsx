import { useState } from "react";

import { isEqual } from "date-fns";

import { DateInput } from "@/components/date-input";
import { DailyRoutineItem } from "./daily-routine-item";

import { Plan } from "@/types/types";

interface DayViewerProps {
  plan: Plan;
}

export const DayViewer = ({ plan }: DayViewerProps) => {
  const [selectedDay, setSelectedDay] = useState<Date>(plan.startDate);

  return (
    <section className="w-full p-2 flex flex-col items-center gap-2 bg-white border border-sky-800 rounded-xl">
      <DateInput
        date={selectedDay}
        setDate={setSelectedDay}
        dateFormat="completely"
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
    </section>
  );
}


