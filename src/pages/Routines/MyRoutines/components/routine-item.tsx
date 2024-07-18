import { useNavigate } from "react-router-dom"

import { SquareArrowOutUpRightIcon } from "lucide-react";
import { StatsCard } from "@/components/stats-card"

import { Routine } from "@/types/types";

interface RoutineItemProps {
  routine: Routine;
}

export const RoutineItem = ({ routine }: RoutineItemProps) => {

  const navigate = useNavigate()

  const navigateToDetailsPage = () => {
    navigate(`/detalhes-da-rotina/${routine.id}`)
  }

  return (
    <li
      className="min-h-42 w-full flex bg-white border-2 border-sky-800 rounded-xl shadow-xl"
    >
      <div className="w-full flex-1 flex flex-col gap-2 p-2">
        <header className="flex items-center gap-1">
          <h2 className="pl-1 text-lg font-semibold text-sky-950 truncate">
            {routine.name}
          </h2>
          <button
            onClick={navigateToDetailsPage}
            className="ml-auto p-1 bg-sky-900 rounded-md"
          >
            <SquareArrowOutUpRightIcon className="text-white" />
          </button>
        </header>
        <main className="flex flex-col gap-4">
          <section className="flex justify-between gap-4">
            <StatsCard
              title="Calorias"
              value={routine.totalCalories.toFixed()}
              type="flame"
              className="flex-1"
            />
            <StatsCard
              title="Agua"
              value={routine.water}
              type="water"
              className="flex-1"
            />
          </section>
          <ul className="flex items-center justify-between gap-1 ">
            <li className="min-w-12 flex justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
              C {routine.totalCarbohydrates.toFixed()}g
            </li>
            <li className="min-w-12 flex justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
              P {routine.totalProteins.toFixed()}g
            </li>
            <li className="min-w-12 flex justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
              G {routine.totalFats.toFixed()}g
            </li>
            <li className="min-w-12 flex justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
              S {routine.totalSodiums.toFixed(3)}g
            </li>
            <li className="min-w-12 flex justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
              F {routine.totalFibers.toFixed()}g
            </li>
          </ul>
        </main>
      </div>
    </li>
  )
}
