import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"

import { getPlansList } from "@/services/http/plan/get-plans-list";

import { ArrowLeft, CirclePlus } from "lucide-react"
import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { PlanItem } from "./components/plan-item";

export const MyPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: routinesList, isError } = useQuery({
    queryKey: ["plansList"],
    queryFn: getPlansList,
    refetchOnMount: false,
  })

  if (isError || !routinesList) {
    return <div>Erro ao carregar rotinas</div>
  }

  const filteredRoutine = routinesList?.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Meus planos</h1>
        <Link to="/novo-plano">
          <CirclePlus size={32} className="absolute top-4 right-0" />
        </Link>
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredRoutine}
          renderItem={({ item }) => <PlanItem key={item.id} plan={item} />}
        />
      </main>
    </div>
  )
}
