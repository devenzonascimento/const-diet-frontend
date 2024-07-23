import { usePlanContext } from "@/context/plan-context"

import { addMonths } from "date-fns"

import { XIcon } from "lucide-react"
import { DefaultInput } from "@/components/default-input"
import { DateInput } from "@/components/date-input"
import { EveryDayCycle } from "../_components/every-day-cycle"
import { AlternatedCycle } from "../_components/alternated-cycle"
import { WeeklyCycle } from "../_components/weekly-cycle"
import { CustomCycle } from "../_components/custom-cycle"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

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
    routinesCycle,
    isCycleDefined,
    toggleCycleDefined,
    isFormComplete,
    handleCreatePlan,

    createPlanMutation
  } = usePlanContext()

  return (
    <div className="h-screen flex flex-col gap-4 bg-slate-100">
      {createPlanMutation.isPending && (
        <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-black/70 flex items-center justify-center">
          <div className="h-40 w-60 bg-white flex items-center justify-center rounded-xl">
            <p className="text-2xl font-semibold">Aguarde...</p>
          </div>
        </div>
      )}
      <Header
        title="Novo plano"
        leftButtonNavigateTo="/meus-planos"
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <DefaultInput
          label="Dê um nome ao seu plano"
          placeholder="Ex: Projeto verão"
          maxLength={30}
          value={nameValue}
          onChange={({ target }) => setNameValue(target.value)}
        />
        <DefaultInput
          label="Qual o objetivo do seu plano"
          placeholder="Ex: Ganhar peso"
          maxLength={30}
          value={goalValue}
          onChange={({ target }) => setGoalValue(target.value)}
        />
        <fieldset className="w-full flex gap-4">
          <DateInput
            label="Início"
            date={startDateValue}
            setDate={setStartDateValue}
            popupAlign="start"
            setRange={{
              fromDate: new Date(),
              toDate: addMonths(new Date(), 12)
            }}
          />
          <DateInput
            label="Fim"
            date={endDateValue}
            setDate={setEndDateValue}
            popupAlign="end"
            setRange={{
              fromDate: startDateValue,
              toDate: addMonths(startDateValue, 12)
            }}
          />
        </fieldset>
        {!isCycleDefined ?
          (
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
          )
          :
          (
            <div className="relative w-full flex flex-col gap-2">
              <XIcon size={32} onClick={toggleCycleDefined} className="absolute top-0 right-0" />
              <p className="font-semibold text-lg text-sky-950">
                Seu ciclo
              </p>
              <ul className="flex flex-col gap-4 px-2 py-4 bg-white border border-sky-800 rounded-lg">
                {routinesCycle.map((routineCycle, index) =>
                  <li key={index} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="min-w-14 text-center text-white bg-sky-700 p-1 rounded-md"
                      >
                        {index + 1}º dia
                      </span>
                      <p className="font-medium text-sky-950">{routineCycle?.name}</p>
                    </div>
                    {routinesCycle.length - 1 > index &&
                      <hr className="w-[97%] self-center border-gray-300" />
                    }
                  </li>
                )}
              </ul>
            </div>
          )
        }

        <Button
          disabled={!isFormComplete}
          type="submit"
          className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
          onClick={handleCreatePlan}
        >
          Criar plano
        </Button>
      </main>
    </div>
  )
}
