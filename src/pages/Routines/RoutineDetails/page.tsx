import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"

import { getRoutine } from "@/services/http/routine/get-routine";

import { Header } from "@/components/header";
import { DropletIcon, FlameIcon } from "lucide-react"
import { StatsCard } from "@/components/stats-card";
import { List } from "@/components/list";
import { RoutineMealItem } from "./components/routine-meal-item";
import { useRoutineContext } from "@/context/routine-context";

interface RouteParams {
  routineId: string;
}

export const RoutineDetailsPage = () => {
  const { routineId } = useParams<keyof RouteParams>() as RouteParams;

  const navigate = useNavigate()

  const onEditOptionClick = () => {
    navigate(`/editar-rotina/${routineId}`)
  }

  const { deleteRoutineStates, handleDeleteRoutine } = useRoutineContext()

  const { data: routine, isError } = useQuery({
    queryKey: [`routine-${routineId}`],
    queryFn: () => getRoutine(routineId),
    refetchOnMount: false,
  })

  if (isError) {
    navigate("/minhas-rotinas")
  }

  if (!routine) {
    return null
  }

  return (
    <div className="h-screen flex flex-col gap-2 bg-slate-100">
      {deleteRoutineStates.isPending && (
        <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-black/70 flex items-center justify-center">
          <div className="h-40 w-60 bg-white flex items-center justify-center rounded-xl">
            <p className="text-2xl font-semibold">Aguarde...</p>
          </div>
        </div>
      )}
      <Header
        title="Detalhes da rotina"
        leftButtonNavigateTo="/minhas-rotinas"
        rightButtonOptions={{
          onEditOptionClick,
          onDeleteOptionClick: () => handleDeleteRoutine(routineId)
        }}
      />
      <main className="flex flex-col justify-between items-center gap-4 pb-6 px-2">
        <section className="w-full flex flex-col items-center gap-2 bg-white border border-sky-800 rounded-xl overflow-hidden">
          <header className="w-full p-2">
            <h1 className="w-full text-center text-xl font-semibold text-sky-950">
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
                data={routine.meals.sort((a, b) => {
                  const [aHours, aMinutes] = a.time.split(':').map(Number);
                  const [bHours, bMinutes] = b.time.split(':').map(Number);

                  if (aHours === bHours) {
                    return aMinutes - bMinutes;
                  }
                  return aHours - bHours;
                })}
                renderItem={({ item }) => <RoutineMealItem key={item.meal.id} routineMeal={item} />}
              />
            </section>
          </main>
        </section>
      </main>
    </div>
  )
}
