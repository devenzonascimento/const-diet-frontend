import { useMealContext } from "@/hooks/use-meal-context";
import { useModalState } from "@/hooks/useModalState";

import { Link, useParams } from "react-router-dom";

import { FoodsList } from "./components/foods-list";
import { When } from "@/components/when";
import { AddFoodCard } from "./components/add-food-card";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Soup } from "lucide-react";
import { useEffect } from "react";

interface RouteParams {
  mealId: string;
}

export const EditMealPage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { mealName, handleInputValue, handleCreateMeal, loadMealById } = useMealContext()

  const params = useParams<keyof RouteParams>() as RouteParams;

  const { mealId } = params;

  useEffect(() => {
    loadMealById(mealId);
  }, [mealId, loadMealById]);

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4">
        <Link to="/my-meals">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Editar refeição</h1>
      </header>

      <main className="flex flex-col justify-center items-center gap-8 pb-6">
        <div className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md">
          <fieldset className="w-full p-1 border-b-4 border-sky-700">
            <input
              type="text"
              placeholder="Nome da refeição"
              value={mealName}
              maxLength={30}
              onChange={({ target }) => handleInputValue(target.value)}
              className=" w-full text-lg font-semibold text-sky-900 text-center bg-transparent"
            />
          </fieldset>
          <FoodsList openFormModal={toggleModal} />
        </div>

        <Button
          type="submit"
          className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
          onClick={handleCreateMeal}
        >
          <Soup />
          Salvar alterações
        </Button>
        <When expr={isOpen}>
          <AddFoodCard onClose={toggleModal} />
        </When>
      </main>
    </div>
  );
}

