import { CycleIllustrationItem } from "./cycle-illustration-item"

import { CycleIllustrationType } from "@/types/types"

interface CycleIllustrationProps {
  cycle: CycleIllustrationType[]
}

export const CycleIllustration = ({ cycle }: CycleIllustrationProps) => {
  return (
    <ul className="w-full flex gap-1 overflow-auto rounded-l-xl p-1 ">
      {cycle.map(({ day, number }, index) =>
        <CycleIllustrationItem key={index} day={day} number={number} />
      )}
    </ul>
  )
}
