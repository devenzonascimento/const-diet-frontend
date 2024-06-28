import { cn } from "@/lib/utils";

interface NutrientBadgeProps {
  title: string;
  value: string | number;
  className?: string
}

export const NutrientBadge = ({ title, value, className }: NutrientBadgeProps) => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center bg-sky-500 text-white border-2 border-white rounded-xl font-semibold text-center", className)}
    >
      <span className="w-full p-1 border-b-2 border-white">
        {title}
      </span>
      <span className="p-1">
        {value}g
      </span>
    </div>
  )
}