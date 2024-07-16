import { useModalState } from "@/hooks/use-modal-state";

import { format } from "date-fns"
import { ptBR } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarSearchIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { SelectSingleEventHandler } from "react-day-picker";

interface SelectDayViewerProps {
  date: Date | undefined
  setDate: (newDate: Date) => void
  setRange?: { fromDate: Date, toDate: Date }
}

export const SelectDayViewer = ({ date, setDate, setRange }: SelectDayViewerProps) => {
  const { isOpen, toggleModal } = useModalState()
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={toggleModal}
          className="w-full flex items-center bg-sky-800 border border-sky-800 rounded-md overflow-hidden"
        >
          <span className="flex items-center justify-center px-2 rounded-l-sm">
            <CalendarSearchIcon size={24} className=" text-white" />
          </span>
          <span className="w-full p-2 text-start text-lg font-medium text-sky-950 bg-white">
            {date ?
              format(date, "EEE, dd 'de' LLL 'de' y", { locale: ptBR })
              :
              "Pick a date"
            }
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={"center"}>
        <Calendar
          weekStartsOn={1}
          defaultMonth={date}
          initialFocus
          mode="single"
          selected={date}
          {...setRange}
          onSelect={setDate as SelectSingleEventHandler}
          onDayClick={toggleModal}
        />
      </PopoverContent>
    </Popover>
  )
}