import { useModalState } from "@/hooks/use-modal-state"
import { CycleIllustration } from "./cycle-illustration"

import { CUSTOM_1_CYCLE, CUSTOM_2_CYCLE } from "@/constants/constants"
import { When } from "@/components/when"
import { CycleCard } from "./cycle-card"

export const CustomCycle = () => {
  const { isOpen, toggleModal } = useModalState()

  return (
    <>
      <li
        onClick={toggleModal}
        className="w-full flex flex-col bg-white rounded-xl shadow-xl border-2 border-sky-900 overflow-hidden"
      >
        <div className="flex flex-col gap-1 p-3">
          <h2 className="font-semibold text-lg text-sky-950">Personalizado</h2>
          <p className="text-sm text-slate-500">
            Essa frequência permite definir um ciclo personalizado com um número específico de dias. Você pode escolher quantos dias seu ciclo terá e definir um plano de alimentação específico para cada dia dentro desse ciclo. Ideal para quem quer um plano flexível e totalmente adaptado às suas necessidades nutricionais.
          </p>
        </div>
        <div className="flex flex-col pl-2 pb-2">
          <CycleIllustration cycle={CUSTOM_1_CYCLE} />
          <span className="w-full text-center font-semibold text-lg text-sky-950">Ou</span>
          <CycleIllustration cycle={CUSTOM_2_CYCLE} />
        </div>
      </li>
      <When expr={isOpen} >
        <CycleCard
          title="Ciclo de repetição personalizado"
          description="explicação..."
          isCustom={true}
          numberOfSlots={1}
          onClose={toggleModal}
        />
      </When>
    </>
  )
}
