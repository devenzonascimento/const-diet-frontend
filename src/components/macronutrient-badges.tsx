import { cn } from "@/lib/utils";

interface MacronutrientsBadgeProps {
  nutrients: {
    carbo: number;
    protein: number;
    fat: number;
  };
  className?: string;
}

const MacronutrientsBadge = ({ className, nutrients }: MacronutrientsBadgeProps) => {
  const { carbo, protein, fat } = nutrients;

  return (
    <div className={cn("w-fit flex justify-center gap-3", className)} >
      <p
        className={`px-1 block font-medium text-center text-blue-700 bg-blue-200 rounded-lg`}
      >
        {`C: ${carbo.toFixed(1)}g`}
      </p>
      <p
        className={`px-1 block font-medium text-center text-cyan-700 bg-cyan-200 rounded-lg`}
      >
        {`P: ${protein.toFixed(1)}g`}
      </p>
      <p
        className={`px-1 block font-medium text-center text-sky-700 bg-sky-200 rounded-lg`}
      >
        {`G: ${fat.toFixed(1)}g`}
      </p>
    </div>
  );
};

export default MacronutrientsBadge;
