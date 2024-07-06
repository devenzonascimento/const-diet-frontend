import { usePlanContext } from "@/context/plan-context"
import { Link } from "react-router-dom"

import { ArrowLeft } from "lucide-react"
import { DefaultInput } from "@/components/default-input"
import { DateInput } from "@/components/date-input"
import { EveryDayCycle } from "../_components/every-day-cycle"
import { AlternatedCycle } from "../_components/alternated-cycle"
import { WeeklyCycle } from "../_components/weekly-cycle"
import { CustomCycle } from "../_components/custom-cycle"

export const AddNewPlanPage = () => {
  const {
    nameValue,
    setNameValue,
    goalValue,
    setGoalValue,
    startDateValue,
    setStartDateValue,
    endDateValue,
    setEndDateValue,
  } = usePlanContext()

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
          value={nameValue}
          onChange={({ target }) => setNameValue(target.value)}
        />
        <DefaultInput
          label="Qual o objetivo do seu plano"
          placeholder="Ex: Ganhar peso"
          value={goalValue}
          onChange={({ target }) => setGoalValue(target.value)}
        />
        <fieldset className="w-full flex gap-4">
          <DateInput
            label="Inicio"
            date={startDateValue}
            setDate={setStartDateValue}
          />
          <DateInput
            label="Fim"
            date={endDateValue}
            setDate={setEndDateValue}
          />
        </fieldset>
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold text-lg text-sky-950">
            Escolha uma frequência
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













