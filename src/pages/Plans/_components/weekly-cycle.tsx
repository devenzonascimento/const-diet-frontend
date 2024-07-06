import { CycleIllustration } from "./cycle-illustration"

import { WEEKLY_1_CYCLE, WEEKLY_2_CYCLE } from "@/constants/constants"

export const WeeklyCycle = () => {
  return (
    <li
      className="w-full flex flex-col bg-white rounded-xl shadow-xl border-2 border-sky-900 overflow-hidden"
    >
      <div className="flex flex-col gap-1 p-3">
        <h2 className="font-semibold text-lg text-sky-950">Semanal</h2>
        <p className="text-sm text-slate-500">
          Essa periodicidade define um ciclo semanal, onde cada dia da semana pode ter um plano de alimentação diferente. Perfeito para quem gosta de ter uma variedade de refeições ao longo da semana.
        </p>
      </div>
      <div className="flex flex-col pl-2 pb-2">
        <CycleIllustration cycle={WEEKLY_1_CYCLE} />
        <span className="w-full text-center font-semibold text-lg text-sky-950">Ou</span>
        <CycleIllustration cycle={WEEKLY_2_CYCLE} />
      </div>
    </li>
  )
}
