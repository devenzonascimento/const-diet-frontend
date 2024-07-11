import { usePlanContext } from "@/context/plan-context";
import { useEffect, useState } from "react";


import { ModalBackdrop } from "@/components/modal-backdrop";
import { List } from "@/components/list";
import { RoutineSlot } from "./routine-slot";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";


interface CycleCardProps {
  title: string;
  description?: string;
  numberOfSlots?: number;
  isCustom?: boolean
  onClose: () => void;
}

export const CycleCard = ({
  title,
  description,
  numberOfSlots = 1,
  isCustom,
  onClose
}: CycleCardProps) => {

  const { routinesCycle, setRoutinesCycle, startDateValue, setIsCycleDefined } = usePlanContext()

  useEffect(() => {
    setRoutinesCycle(Array.from({ length: numberOfSlots }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [existEmptySlot, setExistEmptySlot] = useState<boolean>(true)

  useEffect(() => {
    setExistEmptySlot(routinesCycle.some(routineCycle => routineCycle === undefined))
  }, [routinesCycle, setRoutinesCycle])

  const handleSave = () => {
    setIsCycleDefined()
    onClose()
  }

  return (
    <>
      <ModalBackdrop onClose={onClose} >
        <div
          className="h-[80%] w-[90%] flex flex-col gap-2 items-center p-2 bg-white border-4 border-sky-400 rounded-xl"
        >
          <header className="flex flex-col gap-2 items-center">
            <h1 className="font-semibold text-lg text-sky-950">{title}</h1>
            <p className="text-sm text-slate-500">{description}</p>
          </header>
          <main className="w-full flex-1 overflow-auto">
            <List
              data={routinesCycle}
              renderItem={({ item, index }) => (
                <div key={index}>
                  <p className="pl-1 font-semibold text-sky-950">
                    {index + 1}º dia - {format(addDays(startDateValue, index), "E, dd 'de' LLLL 'de' y", { locale: ptBR })}
                  </p>
                  <RoutineSlot routine={item} slot={index} />
                </div>
              )}
            />
            {isCustom &&
              <Button
                type="submit"
                onClick={() => {
                  setRoutinesCycle([...routinesCycle, undefined])
                }}
                className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
              >
                Adicionar novo slot
              </Button>
            }
          </main>
          <Button
            disabled={existEmptySlot}
            type="submit"
            onClick={handleSave}
            className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
          >
            Salvar ciclo
          </Button>
        </div>
      </ModalBackdrop>
    </>
  )
}
