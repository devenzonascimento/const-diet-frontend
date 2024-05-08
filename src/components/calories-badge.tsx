import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface CaloriesBadgeProps {
  calories: number;
  className?: string;
}

const CaloriesBadge = ({ className, calories }: CaloriesBadgeProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <Flame className="text-red-600 fill-yellow-500" size={20} />
      <p className="pt-1 text-gray-800 font-semibold">
        {calories}
        <span className="text-xs">kcal</span>
      </p>
    </div>
  );
};

export default CaloriesBadge;
