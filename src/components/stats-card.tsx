import { cn } from "@/lib/utils";

import { FlameIcon, DropletIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  className?: string
  type?: "" | "flame" | "water"
}

export const StatsCard = ({ title, value, className, type = "" }: StatsCardProps) => {
  return (
    <div
      className={cn("flex flex-col items-center rounded-xl font-semibold text-center", className)}
    >
      <span className="w-full flex items-center justify-center gap-1 p-1 text-white bg-sky-800 rounded-t-xl">
        {title}
        {type ? (
          (type == "flame") ?
            (
              <FlameIcon size={16} className="text-white fill-white" />
            )
            :
            (
              <DropletIcon size={16} className="text-white fill-white" />
            )
        )
          :
          (
            null
          )}
      </span>
      <span className="w-full p-1 text-sky-950 bg-white border-2 border-sky-800 rounded-b-xl">
        {value}
        <span className="text-xs">{type ? (type && type == "flame" ? "kcal" : "ml") : "g"}</span>
      </span>
    </div>
  )
}