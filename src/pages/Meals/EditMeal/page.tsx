import { useMealContext } from "@/hooks/use-meal-context";
import { useModalState } from "@/hooks/useModalState";

import { Link, useParams } from "react-router-dom";

import { FoodsList } from "./components/foods-list";
import { When } from "@/components/when";
import { AddFoodCard } from "./components/add-food-card";
import { Button } from "@/components/ui/button";
import { Loading } from "./components/loading";

import { ArrowLeft, Soup } from "lucide-react";
import { useEffect } from "react";
import { getMeal } from "@/services/http/meal/get-meal";
import { useQuery } from "@tanstack/react-query";
import { InputField } from "./components/input-field";

interface RouteParams {
  mealId: string;
}

export const EditMealPage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { handleUpdateMeal, loadMealData } = useMealContext()

  const { mealId } = useParams<keyof RouteParams>() as RouteParams;

  const {data: meal, isPending} = useQuery({ 
    queryKey: [`meal-${mealId}`],
    queryFn: () => getMeal(mealId)
  })

  useEffect(() => {
    if (meal) {
      loadMealData(meal)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  if (isPending) {
    return <Loading />
  }

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/my-meals">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Editar refeição</h1>
      </header>

      <main className="flex flex-col justify-center items-center gap-8 pb-6">
        <div className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md">
          <InputField />
          <FoodsList openFormModal={toggleModal} />
        </div>

        <Link className="w-full" to="/my-meals" >
          <Button
            className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
            onClick={handleUpdateMeal}
          >
            <Soup />
            <span>Salvar alterações</span>
          </Button>
        </Link>

        <When expr={isOpen}>
          <AddFoodCard onClose={toggleModal} />
        </When>
      </main>
    </div>
  );
}

