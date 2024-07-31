import { useQuery } from "@tanstack/react-query"
import { useModalState } from "@/hooks/use-modal-state"

import { planService } from "@/services/http/plan/plan-service"

import { addDays, differenceInDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { CalendarCheckIcon, SquarePenIcon } from "lucide-react"
import { When } from "@/components/when"
import { SelectPlanToActivate } from "./select-plan-to-activate"
import { Skeleton } from "@/components/ui/skeleton"

export const ActivePlan = () => {

  const { isOpen, toggleModal } = useModalState()

  const { data: plan, isPending } = useQuery({
    queryKey: ["active-plan"],
    queryFn: planService.getActivePlan
  })

  if (isPending) {
    return <ActivePlanLoading />
  }

  return (
    <section className="w-full flex flex-col">
      <h2 className="w-full pl-1 text-xl font-semibold text-sky-900">Plano ativo</h2>
      {plan ? (
        <div className="relative w-full flex flex-col gap-4 p-2  bg-white  border-2 border-sky-800 rounded-xl">
          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 p-1 bg-sky-900 rounded-md"
          >
            <SquarePenIcon className="text-white" />
          </button>
          <div className="flex flex-col">
            <h2 className="w-full text-start text-xl font-medium text-sky-950">
              {plan.name}
            </h2>
            <span className="w-full text-start font-medium text-sky-950">
              {plan.goal}
            </span>
          </div>
          <div className="w-full flex items-end justify-between">
            <div>
              <p className="capitalize">
                {format(new Date(), "EEEE", { locale: ptBR })}
              </p>
              <p>
                {format(new Date(), "dd 'de' LLLL 'de' y", { locale: ptBR })}
              </p>
            </div>
            <p>
              {differenceInDays(addDays(new Date(), 1), plan.startDate)}
              /
              {differenceInDays(addDays(plan.endDate, 1), plan.startDate)} dias
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleModal}
          className="h-32 w-full flex items-center justify-center gap-2 p-2 text-gray-500 bg-white  border-2 border-sky-800 rounded-xl"
        >
          <CalendarCheckIcon size={36} />
          <p className="text-2xl font-semibold">
            Ativar um plano
          </p>
        </button>
      )}
      <When expr={isOpen}>
        <SelectPlanToActivate onClose={toggleModal} />
      </When>
    </section>
  )
}

export const ActivePlanLoading = () => {
  return (
    <section className="w-full flex flex-col">
      <h2 className="w-full pl-1 text-xl font-semibold text-sky-900">Plano ativo</h2>
      <div className="h-32 w-full flex flex-col gap-10 p-2  bg-white  border-2 border-sky-800 rounded-xl">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-56 bg-gray-400 rounded-sm" />
          <Skeleton className="h-3 w-36 bg-gray-300 rounded-sm" />
        </div>
        <div className="w-full flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-28 bg-gray-300 rounded-sm" />
            <Skeleton className="h-3 w-36 bg-gray-300 rounded-sm" />
          </div>
          <Skeleton className="h-3 w-24 bg-gray-300 rounded-sm" />
        </div>
      </div>
    </section>
  )
}
