import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar as CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker";

interface DateInputProps {
  label: string;
  date: Date | undefined
  setDate: (newDate: Date) => void
}

export function DateInput({ label, date, setDate }: DateInputProps) {
  return (
    <fieldset className="w-full flex flex-col gap-2">
      <p className="font-semibold text-lg text-sky-950">
        {label}
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className="w-full flex items-center text-lg py-1 px-2 border border-sky-900 rounded-md text-left font-normal bg-white"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ?
              format(date, "dd/LL/y")
              :
              <span>Pick a date</span>
            }
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            defaultMonth={date}          
            initialFocus
            mode="single"
            selected={date}
            onSelect={setDate as SelectSingleEventHandler}
          />
        </PopoverContent>
      </Popover>
    </fieldset>
  )
}
