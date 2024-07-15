import { FlameIcon, DropletIcon } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { List } from "@/components/list";
import { DailyMealItem } from "./daily-meal-item";

import { DailyRoutine } from "@/types/types"

interface DailyRoutineItemProps {
  routine: DailyRoutine;
}

export const DailyRoutineItem = ({ routine }: DailyRoutineItemProps) => {
  return (
    <main className="w-full flex flex-col gap-4 ">
      <h3 className="w-full text-center text-xl font-semibold text-sky-950">
        {routine.name}
      </h3>
      <section className="w-full flex justify-evenly">
        <div className="h-32 w-32 flex flex-col gap-1 items-center justify-center bg-white border-4 border-sky-800 rounded-full">
          <FlameIcon strokeWidth={1} className="text-sky-600 fill-sky-100" size={48} />
          <p className="mb-3 text-sky-950">
            <span className="text-2xl font-medium">{routine.totalCalories.toFixed()}</span>
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
          value={`${routine.totalCarbohydrates.toFixed()}g`}
          className="col-span-3"
        />
        <StatsCard
          title="Proteínas"
          value={`${routine.totalProteins.toFixed()}g`}
          className="col-span-3"
        />
        <StatsCard
          title="Gorduras"
          value={`${routine.totalFats.toFixed()}g`}
          className="col-span-2"
        />
        <StatsCard
          title="Sódio"
          value={`${routine.totalSodiums.toFixed()}g`}
          className="col-span-2"
        />
        <StatsCard
          title="Fibras"
          value={`${routine.totalFibers.toFixed()}g`}
          className="col-span-2"
        />
      </section>
      <h4 className="w-full text-sky-950 text-xl font-medium text-center">Suas refeições</h4>
      <List
        data={routine.meals.sort((a, b) => {
          const [aHours, aMinutes] = a.time.split(':').map(Number);
          const [bHours, bMinutes] = b.time.split(':').map(Number);
      
          if (aHours === bHours) {
            return aMinutes - bMinutes;
          }
          return aHours - bHours;
        })}
        renderItem={({ item }) => <DailyMealItem key={item.id} meal={item} />}
      />
    </main>
  )
}

