import { useState } from "react";

import { isEqual } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

import { SelectSingleEventHandler } from "react-day-picker";
import { Plan } from "@/types/types";

interface DayViewerProps {
  plan: Plan;
}

export const DayViewer = ({ plan }: DayViewerProps) => {
  const [selectedDay, setSelectedDay] = useState<Date>(plan?.startDate);

  return (
    <section className="w-full p-2 flex flex-col items-center bg-white border border-sky-800 rounded-xl">
      <Calendar
        weekStartsOn={1}
        selected={selectedDay}
        mode="single"
        initialFocus
        onSelect={setSelectedDay as SelectSingleEventHandler}
        fromDate={plan?.startDate}
        toDate={plan?.endDate}
        className="w-min flex items-center bg-white border border-sky-800 rounded-lg"
      />
      <div>
        {plan?.routines.find(routine => isEqual(routine.date, selectedDay)
        )?.name}
      </div>
    </section>
  );
}