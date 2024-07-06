import { useState } from "react"
import { Link } from "react-router-dom"

import { addMonths } from "date-fns"

import { ArrowLeft } from "lucide-react"
import { DefaultInput } from "@/components/default-input"
import { DateInput } from "@/components/date-input"
import { EveryDayCycle } from "../_components/every-day-cycle"
import { AlternatedCycle } from "../_components/alternated-cycle"
import { WeeklyCycle } from "../_components/weekly-cycle"
import { CustomCycle } from "../_components/custom-cycle"

export const AddNewPlanPage = () => {
  const [date, setDate] = useState<{ start: Date, end: Date }>({
    start: new Date(),
    end: addMonths(new Date(), 3),
  })

  const setStart = (newDate: Date) => {
    setDate({ ...date, start: newDate })
  }

  const setEnd = (newDate: Date) => {
    setDate({ ...date, end: newDate })
  }

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/meus-planos">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Novo plano</h1>
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">
        <DefaultInput
          label="Dê um nome ao seu plano"
          placeholder="Ex: Projeto verão"
        />
        <DefaultInput
          label="Qual o objetivo do seu plano"
          placeholder="Ex: Ganhar peso"
        />
        <fieldset className="w-full flex gap-4">
          <DateInput label="Inicio" date={date?.start} setDate={setStart} />
          <DateInput label="Fim" date={date?.end} setDate={setEnd} />
        </fieldset>
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold text-lg text-sky-950">
            Escolha a periodicidade
          </p>
          <ul className="flex flex-col gap-4">
            <EveryDayCycle />
            <AlternatedCycle />
            <WeeklyCycle />
            <CustomCycle />
          </ul>
        </div>
      </main>
    </div>
  )
}













