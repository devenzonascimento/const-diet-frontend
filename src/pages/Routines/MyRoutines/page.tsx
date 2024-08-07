import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getRoutinesList } from "@/services/http/routine/get-routines-list"

import { List } from "@/components/list"
import { RoutineItem } from "./components/routine-item"
import { SearchInput } from "@/components/search-input"
import { Header } from "@/components/header"

export const MyRoutinesPage = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: routinesList, isPending } = useQuery({
    queryKey: ["routinesList"],
    queryFn: getRoutinesList,
  })

  const filteredList = routinesList?.filter(routine =>
    routine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Minhas rotinas"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/nova-rotina"
      />
      <main className="w-full flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredList ?? []}
          renderItem={({ item }) => <RoutineItem key={item.id} routine={item} />}
        />
        {isPending && <p>Loading</p>}
      </main>
    </>
  )
}



