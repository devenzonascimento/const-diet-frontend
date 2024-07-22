import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPlansList } from "@/services/http/plan/get-plans-list";

import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { PlanItem } from "./components/plan-item";
import { Header } from "@/components/header";

export const MyPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["plansList"],
    queryFn: getPlansList,
    refetchOnMount: false,
  })

  const filteredList = data?.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col gap-4 bg-slate-100">
      <Header
        title="Meus planos"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/novo-plano"
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredList || []}
          renderItem={({ item }) => <PlanItem key={item.id} plan={item} />}
        />
      </main>
    </div>
  )
}
