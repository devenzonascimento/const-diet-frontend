import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getRoutinesList } from "@/services/http/routine/get-routine-list";

import { ModalBackdrop } from "@/components/modal-backdrop";
import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { RoutineItem } from "./routine-item";

import { Routine } from "@/types/types";
import { RoutinesItemsLoading } from "./routines-items-loading";

export const SelectRoutinesCard = ({ onClose, itemsAction }: { onClose: () => void, itemsAction: (routine: Routine) => void }) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: routinesList, isPending } = useQuery({
    queryKey: ['routinesList'],
    queryFn: getRoutinesList
  })

  const filteredRoutines = routinesList?.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="h-[80%] w-[90%] flex flex-col gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-md">
        <h2 className="text-xl font-semibold text-center text-sky-950">
          Escolha uma refeição
        </h2>
        <SearchInput
          placeholder="Buscar alimento"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        {isPending ?
          (
            <RoutinesItemsLoading />
          )
          :
          (
            <List
              data={filteredRoutines || []}
              renderItem={({ item }) =>
                <RoutineItem key={item.id} routine={item} onClick={() => itemsAction(item)} />
              }
            />
          )
        }
      </div>
    </ModalBackdrop>
  )
}
