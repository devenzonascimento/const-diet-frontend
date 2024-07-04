import { useModalState } from "@/hooks/use-modal-state";
import { useMealContext } from "@/context/meal-context";

import { Link } from "react-router-dom";


import { When } from "@/components/when";

import { Button } from "@/components/ui/button";

import { ArrowLeft, Soup } from "lucide-react";
import { useEffect } from "react";
import { InputField } from "../_components/input-field";
import { FoodsBasket } from "../_components/foods-basket";
import { AddFoodCard } from "../_components/add-food-card";


export const AddNewMealPage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { handleCreateMeal, clearContext } = useMealContext()

  useEffect(() => {
    clearContext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/minhas-refeicoes">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Criar refeição</h1>
      </header>

      <main className="flex flex-col justify-center items-center gap-8 pb-6">
        <div className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md">
          <InputField />
          <FoodsBasket openFormModal={toggleModal} />
        </div>

        <Link className="w-full" to="/minhas-refeicoes">
          <Button
            type="submit"
            className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
            onClick={handleCreateMeal}
          >
            <Soup />
            Criar refeição
          </Button>
        </Link>

        <When expr={isOpen}>
          <AddFoodCard onClose={toggleModal} />
        </When>
      </main>
    </div>
  );
}

