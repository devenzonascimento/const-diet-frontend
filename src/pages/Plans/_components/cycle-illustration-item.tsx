import { cn } from "@/lib/utils";

import { CycleIllustrationType } from "@/types/types";

export const CycleIllustrationItem = ({ day, number }: CycleIllustrationType) => {
  const colorMap = {
    "R1": "bg-sky-500",
    "R2": "bg-blue-500",
    "R3": "bg-cyan-500",
    "R4": "bg-teal-500",
    "R5": "bg-emerald-500",
    "R6": "bg-indigo-500",
    "R7": "bg-violet-500",
  }

  return (
    <li className="flex flex-col items-center rounded-md">
      <span className="w-full text-sm text-center text-white bg-gray-900 rounded-t-lg">{day}</span>
      <span
        className={cn("w-10 aspect-square flex items-center justify-center rounded-b-lg uppercase text-white font-semibold", colorMap[number])}
      >
        {number}
      </span>
    </li>
  )
}
