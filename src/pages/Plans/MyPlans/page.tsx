import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { planService } from "@/services/http/plan/plan-service";

import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { PlanItem } from "./components/plan-item";
import { Header } from "@/components/header";

export const MyPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["plansList"],
    queryFn: planService.getAll,
    refetchOnMount: false,
  })

  const filteredList = data?.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Meus planos"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/novo-plano"
      />
      <main className="w-full flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredList || []}
          renderItem={({ item }) => <PlanItem key={item.id} plan={item} hasRedirectButton/>}
        />
      </main>
    </>
  )
}
