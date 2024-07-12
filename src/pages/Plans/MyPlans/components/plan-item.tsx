import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { SquareArrowOutUpRightIcon } from "lucide-react"

import { Plan } from "@/types/types"

interface PlaItemProps {
  plan: Plan
}

export const PlanItem = ({ plan }: PlaItemProps) => {
  return (
    <li
      className="relative min-h-42 w-full flex flex-col gap-2 p-2 bg-white border-2 border-sky-800 rounded-xl shadow-xl"
    >
      <button className="absolute top-2 right-2 p-1 bg-sky-900 rounded-md">
        <SquareArrowOutUpRightIcon className="text-white" />
      </button>
      <h2 className="text-lg font-semibold text-sky-950 truncate">
        {plan.name}
      </h2>
      <p className="text-sky-950 font-semibold">Objetivo: {plan.goal}</p>
      <p className="flex gap-2 text-[0.9rem] font-medium text-sky-950">
        <span className="min-w-max">
          {format(plan.startDate, "dd 'de' LLL 'de' y", { locale: ptBR })}
        </span>
        <span className="min-w-max">até</span>
        <span className="min-w-max">
          {format(plan.endDate, "dd 'de' LLL 'de' y", { locale: ptBR })}
        </span>
      </p>
    </li>
  )
}
