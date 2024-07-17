import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getRoutinesList } from "@/services/http/routine/get-routines-list"

import { List } from "@/components/list"
import { RoutineItem } from "./components/routine-item"
import { SearchInput } from "@/components/search-input"
import { Header } from "@/components/ui/header"

export const MyRoutinesPage = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: routinesList, isError } = useQuery({
    queryKey: ["routinesList"],
    queryFn: getRoutinesList,
    refetchOnMount: false,
  })

  if (isError || !routinesList) {
    return <div>Erro ao carregar rotinas</div>
  }

  const filteredRoutine = routinesList?.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Minhas rotinas"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/nova-rotina"
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredRoutine}
          renderItem={({ item }) => <RoutineItem key={item.id} routine={item} />}
        />
      </main>
    </>
  )
}



