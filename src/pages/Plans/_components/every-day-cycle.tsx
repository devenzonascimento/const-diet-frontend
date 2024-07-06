import { CycleIllustration } from "./cycle-illustration"

import { EVERY_DAY_CYCLE } from "@/constants/constants"

export const EveryDayCycle = () => {
  return (
    <li
      className="w-full flex flex-col bg-white rounded-xl shadow-xl border-2 border-sky-900 overflow-hidden"
    >
      <div className="flex flex-col gap-1 p-3">
        <h2 className="font-semibold text-lg text-sky-950">Todos os dias</h2>
        <p className="text-sm text-slate-500">
          Essa periodicidade define que você vai seguir a mesma rotina todos os dias durante seu plano
        </p>
      </div>
      <div className="pl-2 pb-2">
        <CycleIllustration cycle={EVERY_DAY_CYCLE} />
      </div>
    </li>
  )
}
