import { sortTimes } from "@/functions/sort-times";

import { FlameIcon, DropletIcon } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { List } from "@/components/list";
import { DailyMealItem } from "./daily-meal-item";

import { DailyRoutineComplete } from "@/types/types"

interface DailyRoutineItemProps {
  routine: DailyRoutineComplete;
}

export const DailyRoutineItem = ({ routine }: DailyRoutineItemProps) => {
  return (
    <section className="w-full flex flex-col items-center gap-2 bg-white border border-sky-800 rounded-xl overflow-hidden">
      <header className="w-full p-1 bg-sky-800">
        <h1 className="w-full text-center text-xl font-semibold text-white">
          {routine.name}
        </h1>
      </header>
      <main className="w-full flex flex-col items-center gap-4 p-2">
        <section className="w-full flex justify-evenly">
          <div className="h-32 w-32 flex flex-col gap-1 items-center justify-center bg-white border-4 border-sky-800 rounded-full">
            <FlameIcon strokeWidth={1} className="text-sky-600 fill-sky-100" size={48} />
            <p className="mb-3 text-sky-950">
              <span className="text-2xl font-medium">{routine.calories.toFixed()}</span>
              <span>kcal</span>
            </p>
          </div>
          <div className="h-32 w-32 flex flex-col gap-1 items-center justify-center bg-white border-4 border-sky-800 rounded-full">
            <DropletIcon strokeWidth={1} className="text-sky-600 fill-sky-100" size={48} />
            <p className="mb-3 text-sky-950">
              <span className="text-2xl font-medium">{routine.water}</span>
              <span>ml</span>
            </p>
          </div>
        </section>
        <section className="w-full grid grid-cols-6 gap-2">
          <StatsCard
            title="Carboidratos"
            value={routine.carbohydrates.toFixed()}
            className="col-span-3"
          />
          <StatsCard
            title="Proteínas"
            value={routine.proteins.toFixed()}
            className="col-span-3"
          />
          <StatsCard
            title="Gorduras"
            value={routine.fats.toFixed()}
            className="col-span-2"
          />
          <StatsCard
            title="Sódio"
            value={routine.sodium.toFixed(3)}
            className="col-span-2"
          />
          <StatsCard
            title="Fibras"
            value={routine.fibers.toFixed()}
            className="col-span-2"
          />
        </section>
        <section className="w-full flex flex-col gap-2">
          <h2 className="w-full text-sky-950 text-xl font-semibold text-center">
            Suas refeições
          </h2>
          <List
            data={routine.meals.sort(sortTimes)}
            renderItem={({ item }) => <DailyMealItem key={item.id} meal={item} />}
          />
        </section>
      </main>
    </section>
  )
}
