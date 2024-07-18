import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface CaloriesBadgeProps {
  calories: number;
  className?: string;
}

export const CaloriesBadge = ({ className, calories }: CaloriesBadgeProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <Flame className="text-sky-700 fill-sky-200" size={18} />
      <p className="pt-1 text-gray-800 font-semibold">
        {calories.toFixed()}
        <span className="text-xs">kcal</span>
      </p>
    </div>
  );
};