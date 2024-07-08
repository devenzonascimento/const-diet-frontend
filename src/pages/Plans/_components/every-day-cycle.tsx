import { useModalState } from "@/hooks/use-modal-state"

import { CycleIllustration } from "./cycle-illustration"
import { When } from "@/components/when"
import { CycleCard } from "./cycle-card"

import { EVERY_DAY_CYCLE } from "@/constants/constants"

export const EveryDayCycle = () => {
  const { isOpen, toggleModal } = useModalState()

  return (
    <>
      <li
        onClick={toggleModal}
        className="w-full flex flex-col bg-white rounded-xl shadow-xl border-2 border-sky-900 overflow-hidden"
      >
        <div className="flex flex-col gap-1 p-3">
          <h2 className="font-semibold text-lg text-sky-950">Todos os dias</h2>
          <p className="text-sm text-slate-500">
            Essa frequência define que você seguirá a mesma rotina de alimentação todos os dias durante o período do seu plano. Ideal para quem prefere consistência diária na dieta.
          </p>
        </div>
        <div className="pl-2 pb-2">
          <CycleIllustration cycle={EVERY_DAY_CYCLE} />
        </div>
      </li>
      <When expr={isOpen} >
        <CycleCard
          title="Ciclo de repetição diária"
          description="explicação..."
          numberOfSlots={1}
          onClose={toggleModal}
        />
      </When>
    </>
  )
}












