import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom"

import { getPlan } from "@/services/http/plan/get-plan";

import { ArrowLeft, CalendarFoldIcon, GoalIcon } from "lucide-react"
import { DayViewer } from "./components/day-viewer";

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
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/meus-planos">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Detalhes do seu plano</h1>
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">        
        <div className="w-full flex items-center bg-sky-800 border border-sky-800 rounded-md overflow-hidden">
          <span className="flex items-center justify-center px-2 rounded-l-sm">      
            <CalendarFoldIcon size={24}  className=" text-white"/>
          </span>
          <h2 className="w-full p-2 text-start text-lg font-medium text-sky-950 bg-white">
            {plan?.name}
          </h2>
        </div>
        <div className="w-full flex items-center bg-sky-800 border border-sky-800 rounded-md overflow-hidden">
          <span className="flex items-center justify-center px-2 rounded-l-sm">      
            <GoalIcon size={24}  className=" text-white"/>
          </span>
          <p className="w-full p-2 text-start font-medium text-sky-950 bg-white">
            Objetivo: {plan?.goal}
          </p>
        </div>

        <DayViewer plan={plan} />
      </main>
    </div>
  )
}

