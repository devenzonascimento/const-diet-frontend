import { useModalState } from "@/hooks/use-modal-state";

import { compareAsc, format } from "date-fns"
import { ptBR } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { SelectSingleEventHandler } from "react-day-picker";

interface SelectDayViewerProps {
  date: Date
  setDate: (newDate: Date) => void
  setRange: { fromDate: Date, toDate: Date }
}

export const SelectDayViewer = ({ date, setDate, setRange }: SelectDayViewerProps) => {

  const { isOpen, toggleModal } = useModalState()

  const handleIncreaseDate = () => {
    if (!date) {
      setDate(setRange?.fromDate)
      return
    }

    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)
  }

  const handleDecreaseDate = () => {
    if (!date) {
      setDate(setRange?.toDate)
      return
    }

    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)
  }

  const reachedMinDate = compareAsc(new Date(date), setRange.fromDate) === 0
  const reachedMaxDate = compareAsc(new Date(date), setRange.toDate) === 0

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div className="w-full h-16 flex items-center justify-between bg-sky-800 rounded-xl">
          <button
            onClick={handleDecreaseDate}
            disabled={reachedMinDate}
            className={`${reachedMinDate ? "text-white/30" : "text-white"} h-full px-3 flex items-center justify-center`}
          >
            <ChevronLeftIcon size={32} />
          </button>
          <button
            onClick={toggleModal}
            className="flex flex-col items-center p-2 text-lg text-white font-semibold"
          >
            {date ? (
              <>
                <span className="capitalize">{format(date, "EEEE", { locale: ptBR })}</span>
                <span>{format(date, "dd 'de' LLLL 'de' y", { locale: ptBR })}</span>
              </>
            )
              :
              "Pick a date"
            }
          </button>
          <button
            onClick={handleIncreaseDate}
            disabled={reachedMaxDate}
            className={`${reachedMaxDate ? "text-white/30" : "text-white"} h-full px-3 flex items-center justify-center`}
          >
            <ChevronRightIcon size={32} />
          </button>
        </div>
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
