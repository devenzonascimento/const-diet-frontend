import React from 'react'
import { NavCarrousel } from './components/nav-carrousel'
import { ActivePlan } from './components/active-plan'
import { StatsCard } from '@/components/stats-card'
import { Clock3Icon, SquareArrowOutUpRightIcon, UserIcon } from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <header className="flex items-center justify-between p-2 bg-violet-500">
        <h1 className="px-4 text-white text-2xl font-semibold">Const Diet App</h1>

        <button type="button" className="ml-auto p-3 bg-zinc-700 rounded-full">
          <UserIcon className="size-6 text-white shrink-0" />
        </button>
      </header>

      <NavCarrousel />

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
              type="button"
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
              <StatsCard title="Proteínas" value={100} className="col-span-3" />
              <StatsCard title="Gorduras" value={100} className="col-span-2" />
              <StatsCard title="Sódio" value={100} className="col-span-2" />
              <StatsCard title="Fibras" value={100} className="col-span-2" />
            </main>
          </div>
        </section>
      </main>
    </div>
  )
}
