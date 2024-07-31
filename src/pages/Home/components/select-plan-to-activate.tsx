import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { planService } from "@/services/http/plan/plan-service";

import { compareAsc } from "date-fns";

import { ModalBackdrop } from "@/components/modal-backdrop";
import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { PlanItem } from "@/pages/Plans/MyPlans/components/plan-item";

interface SelectPlanToActivateProps {
  onClose: () => void;
}

export const SelectPlanToActivate = ({ onClose }: SelectPlanToActivateProps) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const queryClient = useQueryClient()

  const { mutateAsync: setActivePlan } = useMutation({
    mutationKey: ["activate-plan"],
    mutationFn: planService.setActivePlan,
    onSuccess: (activePlan) => {
      queryClient.setQueryData(["active-plan"], () => activePlan)
      onClose()
    }
  })

  const { data: plansList } = useQuery({
    queryKey: ["plansList"],
    queryFn: planService.getAll,
    refetchOnMount: false,
  })

  const plansThatCanBeActivated = plansList?.filter(plan => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    return compareAsc(currentDate, plan.startDate) !== -1
  });

  const filteredList = plansThatCanBeActivated?.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="h-[80%] w-[90%] flex flex-col gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-md">
        <h2 className="text-xl font-semibold text-center text-sky-950">
          Selecione o plano a ser ativado
        </h2>
        <SearchInput
          placeholder="Buscar alimento"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        {filteredList?.length !== 0 ? (
          <List
            data={filteredList || []}
            renderItem={({ item }) =>
              <PlanItem
                key={item.id}
                plan={item}
                onClick={() => setActivePlan(item.id)}
              />
            }
          />
        ) : (
          <p className="px-10 text-center">
            Você não tem nenhum plano que possa ser ativado
          </p>
        )}
      </div>
    </ModalBackdrop>
  )
}
