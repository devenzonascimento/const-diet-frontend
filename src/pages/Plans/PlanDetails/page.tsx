import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"

import { getPlan } from "@/services/http/plan/get-plan";

import { ArrowLeft } from "lucide-react"

interface RouteParams {
  planId: string;
}

export const PlanDetailsPage = () => {
  const { planId } = useParams<keyof RouteParams>() as RouteParams;

  const { data: routine } = useQuery({
    queryKey: [`plan-${planId}`],
    queryFn: () => getPlan(planId),
    refetchOnMount: false,
  })

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">{routine?.name}</h1>        
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">
        
      </main>
    </div>
  )
}
