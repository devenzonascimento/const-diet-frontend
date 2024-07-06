import { Routine } from "@/types/types";

interface RoutineItemProps {
  routine: Routine;
  onClick: () => void;
}

export const RoutineItem = ({ routine, onClick }: RoutineItemProps) => {
  return (
    <li
      onClick={onClick}
      className="flex flex-col gap-4 p-2 bg-sky-400 rounded-lg"
    >
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-white break-words">
          {routine.name}
        </h3>
      </header>
      <div className="max-w-full flex flex-wrap gap-2">
        <span>{`Calories ${routine.totalCalories.toFixed()}kcal`}</span>
        <span>{`C ${routine.totalCarbohydrates.toFixed()}g`}</span>
        <span>{`P ${routine.totalProteins.toFixed()}g`}</span>
        <span>{`G ${routine.totalFats.toFixed()}g`}</span>
      </div>
    </li>
  )
}
