import { useModalState } from "@/hooks/use-modal-state"
import { useRoutineContext } from "@/context/routine-context";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom"

import { getMealsList } from "@/services/http/meal/get-meals-list";

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MealsBasket } from "./components/meals-basket";
import { When } from "@/components/when"
import { SelectMealsCard } from "./components/select-meals-card";

export const AddNewRoutinePage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { routine, onRoutineNameChange, handleCreateRoutine } = useRoutineContext()

  const { data: mealsList, isError } = useQuery({
    queryKey: ["mealsList"],
    queryFn: getMealsList,
  })

  if (isError || !mealsList) {
    return <h1>OCORREU UM ERRO</h1>
  }

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/my-routines">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Criar uma Rotina</h1>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 pb-6">
        <div
          className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md"
        >
          <fieldset className="w-full p-1 border-b-4 border-sky-700">
            <input
              type="text"
              placeholder="Dê um nome a sua rotina"
              maxLength={30}
              value={routine.name}
              onChange={({ target }) => onRoutineNameChange(target.value)}
              className=" w-full text-lg font-semibold text-sky-900 text-center bg-transparent"
            />
          </fieldset>
          <MealsBasket meals={routine.meals} openCardToSelectMeals={toggleModal} />
        </div>
        <Button
          type="submit"
          onClick={handleCreateRoutine}
          className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
        >
          Criar rotina
        </Button>
      </main>

      <When expr={isOpen}>
        <SelectMealsCard mealsList={mealsList} onClose={toggleModal} />
      </When>
    </div>
  )
}















