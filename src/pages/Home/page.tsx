import { Header } from "@/components/header"
import { StatsCard } from "@/components/stats-card"
import { AppleIcon, CalendarDaysIcon, Clock3Icon, GoalIcon, ListChecksIcon, SoupIcon, SquareArrowOutUpRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ActivePlan } from "./components/active-plan"

export const HomePage = () => {
  return (
    <>
      <Header
        title="Const Diet"
      />
      <nav className="w-full px-4 flex items-center gap-4 overflow-x-scroll ">
        <Link to="meu-plano-diario" className="min-w-20 flex flex-col items-center gap-1">
          <div className=" p-4 rounded-full text-white  bg-sky-800">
            <GoalIcon size={40} />
          </div>
          <span className="text-[0.95rem] text-center font-semibold text-sky-900">
            Plano de Hoje
          </span>
        </Link>
        <Link to="meus-alimentos" className="min-w-20 flex flex-col items-center gap-1">
          <div className=" p-4 rounded-full text-white  bg-sky-800">
            <AppleIcon size={40} />
          </div>
          <span className="text-[0.95rem] text-center font-semibold text-sky-900">
            Meus Alimentos
          </span>
        </Link>
        <Link to="minhas-refeicoes" className="min-w-20 flex flex-col items-center gap-1">
          <div className=" p-4 rounded-full text-white  bg-sky-800">
            <SoupIcon size={40} />
          </div>
          <span className="text-[0.95rem] text-center font-semibold text-sky-900">
            Minhas Refeições
          </span>
        </Link>
        <Link to="minhas-rotinas" className="min-w-20 flex flex-col items-center gap-1">
          <div className=" p-4 rounded-full text-white  bg-sky-800">
            <ListChecksIcon size={40} />
          </div>
          <span className="text-[0.95rem] text-center font-semibold text-sky-900">
            Minhas Rotinas
          </span>
        </Link>
        <Link to="meus-planos" className="min-w-20 flex flex-col items-center gap-1">
          <div className=" p-4 rounded-full text-white  bg-sky-800">
            <CalendarDaysIcon size={40} />
          </div>
          <span className="text-[0.95rem] text-center font-semibold text-sky-900">
            Meus Planos
          </span>
        </Link>
      </nav>
      <main className="w-full flex-1 flex flex-col items-center gap-4 px-4 pb-6 overflow-auto">

        <ActivePlan />

        <section className="w-full flex flex-col">
          <h2 className="w-full pl-1 flex items-center gap-1 text-xl font-semibold text-sky-900">
            Proxima refeição as 12:30 <Clock3Icon size={20} />
          </h2>
          <div className="relative w-full flex flex-col gap-2 p-2 bg-white  border-2 border-sky-800 rounded-xl">
            <div className="flex flex-col">
              <h2 className="w-full text-xl font-medium text-sky-950">
                Café da manhã
              </h2>
              <p className="w-full pl-1 font-medium text-sky-900">
                3200
                <span className="text-xs">kcal</span>
              </p>
            </div>
            <ul className="flex flex-col list-disc list-inside text-sky-950 font-medium">
              <li>200g de Arroz Branco</li>
              <li>100g de Feijão</li>
              <li>150g de Frango Grelhado</li>
            </ul>
            <button
              className="absolute top-2 right-2 p-1 bg-sky-900 rounded-md"
            >
              <SquareArrowOutUpRightIcon className="text-white" />
            </button>
          </div>
        </section>

        <section className="w-full flex flex-col">
          <h2 className="w-full pl-1 text-xl font-semibold text-sky-900">
            Consumo de hoje
          </h2>
          <div className="w-full flex flex-col items-center bg-white border-2 border-sky-800 rounded-xl overflow-hidden">
            <header className="w-full p-1 bg-sky-800">
              <h1 className="w-full text-center text-xl font-semibold text-white">
                Rotina de carbo alto
              </h1>
            </header>
            <main className="w-full grid grid-cols-6 gap-2 p-4">
              <StatsCard
                title="Calorias"
                value={3200}
                type="flame"
                className="col-span-6"
              />
              <StatsCard
                title="Agua"
                value={3500}
                type="water"
                className="col-span-6"
              />
              <StatsCard
                title="Carboidratos"
                value={100}
                className="col-span-3"
              />
              <StatsCard
                title="Proteínas"
                value={100}
                className="col-span-3"
              />
              <StatsCard
                title="Gorduras"
                value={100}
                className="col-span-2"
              />
              <StatsCard
                title="Sódio"
                value={100}
                className="col-span-2"
              />
              <StatsCard
                title="Fibras"
                value={100}
                className="col-span-2"
              />
            </main>
          </div>
        </section>
      </main>
    </>
  )
}
