import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"

import { getPlan } from "@/services/http/plan/get-plan";

import { CalendarFoldIcon, GoalIcon } from "lucide-react"
import { DayViewer } from "./components/day-viewer";
import { Header } from "@/components/header";

interface RouteParams {
  planId: string;
}

export const PlanDetailsPage = () => {
  const { planId } = useParams<keyof RouteParams>() as RouteParams;
  const navigate = useNavigate()

  const { data: plan, isError } = useQuery({
    queryKey: [`plan-${planId}`],
    queryFn: () => getPlan(planId),
    refetchOnMount: false,
  })

  if (isError) {
    navigate("/meus-planos")
  }

  if (!plan) {
    return null
  }

  return (
    <div className="h-screen flex flex-col gap-4 bg-slate-100">
      <Header
        title="Detalhes do plano"
        leftButtonNavigateTo="/meus-planos"
      />
      <main className="flex flex-col justify-between items-center gap-4 pb-6 px-4">
        <div className="w-full flex items-center bg-sky-800 border border-sky-800 rounded-md overflow-hidden">
          <span className="flex items-center justify-center px-2 rounded-l-sm">
            <CalendarFoldIcon size={24} className=" text-white" />
          </span>
          <h2 className="w-full p-2 text-start text-lg font-medium text-sky-950 bg-white">
            {plan?.name}
          </h2>
        </div>
        <div className="w-full flex items-center bg-sky-800 border border-sky-800 rounded-md overflow-hidden">
          <span className="flex items-center justify-center px-2 rounded-l-sm">
            <GoalIcon size={24} className=" text-white" />
          </span>
          <p className="w-full p-2 text-start text-lg font-medium text-sky-950 bg-white">
            Objetivo: {plan?.goal}
          </p>
        </div>

        <DayViewer plan={plan} />
      </main>
    </div>
  )
}

