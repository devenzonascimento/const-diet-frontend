import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar as CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface DateInputProps {
  label?: string;
  date: Date | undefined
  setDate: (newDate: Date) => void
  popupAlign?: "start" | "center" | "end"
  dateFormat?: "short" | "long" | "completely"
  setRange?: { fromDate: Date, toDate: Date }
}

export function DateInput({
  label,
  date,
  setDate,
  popupAlign = "center",
  dateFormat = "short",
  setRange
}: DateInputProps) {

  const dateFormatMap = {
    short: "dd/LL/y",
    long: "dd 'de' LLLL 'de' y",
    completely: "EEE, dd 'de' LLL 'de' y"
  }

  return (
    <fieldset className="w-full flex flex-col gap-2">
      {label && (
        <p className="font-semibold text-lg text-sky-950">
          {label}
        </p>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className="w-full flex items-center text-lg py-1 px-2 border border-sky-900 rounded-md text-left font-normal bg-white"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-sky-950" />
            <span className="text-sky-950">
              {date ?
                format(date, dateFormatMap[dateFormat], { locale: ptBR })
                :
                "Pick a date"
              }
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={popupAlign}>
          <Calendar
            weekStartsOn={1}
            defaultMonth={date}
            initialFocus
            mode="single"
            selected={date}
            {...setRange}
            onSelect={setDate as SelectSingleEventHandler}
          />
        </PopoverContent>
      </Popover>
    </fieldset>
  )
}
