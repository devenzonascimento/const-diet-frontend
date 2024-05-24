import { cn } from "@/lib/utils";
import { Nutrients } from "@/types/types";

interface MacronutrientsBadgeProps {
  nutrients: Nutrients
  className?: string;
}

const MacronutrientsBadge = ({ className, nutrients: { carbohydrates, proteins, fats }}: MacronutrientsBadgeProps) => {

  return (
    <div className={cn("w-fit flex justify-center gap-3", className)} >
      <p
        className={`px-1 block font-medium text-center text-blue-700 bg-blue-200 rounded-lg`}
      >
        {`C: ${carbohydrates.toFixed(1)}g`}
      </p>
      <p
        className={`px-1 block font-medium text-center text-cyan-700 bg-cyan-200 rounded-lg`}
      >
        {`P: ${proteins.toFixed(1)}g`}
      </p>
      <p
        className={`px-1 block font-medium text-center text-sky-700 bg-sky-200 rounded-lg`}
      >
        {`G: ${fats.toFixed(1)}g`}
      </p>
    </div>
  );
};

export default MacronutrientsBadge;
