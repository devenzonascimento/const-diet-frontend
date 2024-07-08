import { When } from "@/components/when"
import { CycleIllustration } from "./cycle-illustration"

import { ALTERNATED_CYCLE } from "@/constants/constants"
import { CycleCard } from "./cycle-card"
import { useModalState } from "@/hooks/use-modal-state"

export const AlternatedCycle = () => {
  const { isOpen, toggleModal } = useModalState()

  return (
    <>
      <li
        onClick={toggleModal}
        className="w-full flex flex-col bg-white rounded-xl shadow-xl border-2 border-sky-900 overflow-hidden"
      >
        <div className="flex flex-col gap-1 p-3">
          <h2 className="font-semibold text-lg text-sky-950">Alternado</h2>
          <p className="text-sm text-slate-500">
            Essa frequência permite alternar entre duas rotinas de alimentação diferentes em dias consecutivos. Ótimo para quem quer variar entre diferentes tipos de refeições ou nutrientes em dias alternados.
          </p>
        </div>
        <div className="pl-2 pb-2">
          <CycleIllustration cycle={ALTERNATED_CYCLE} />
        </div>
      </li>
      <When expr={isOpen} >
        <CycleCard
          title="Ciclo de repetição alternada"
          description="explicação..."
          numberOfSlots={2}
          onClose={toggleModal}
        />
      </When>
    </>
  )
}
