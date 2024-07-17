import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMealContext } from "@/context/meal-context";
import { useModalState } from "@/hooks/use-modal-state";
import { Link, useParams } from "react-router-dom";

import { getMeal } from "@/services/http/meal/get-meal";

import { When } from "@/components/when";

import { Button } from "@/components/ui/button";
import { Loading } from "./components/loading";

import { Soup } from "lucide-react";
import { InputField } from "../_components/input-field";
import { FoodsBasket } from "../_components/foods-basket";
import { AddFoodCard } from "../_components/add-food-card";
import { Header } from "@/components/ui/header";


interface RouteParams {
  mealId: string;
}

export const EditMealPage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { handleUpdateMeal, loadMealData } = useMealContext()

  const { mealId } = useParams<keyof RouteParams>() as RouteParams;

  const { data: meal, isPending } = useQuery({
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
    <>
      <Header
        title="Editar refeição"
        leftButtonNavigateTo="/minhas-refeicoes"
      />
      <main className="flex flex-col justify-center items-center gap-8 px-4 pb-6">
        <div
          className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md"
        >
          <InputField />
          <FoodsBasket openFormModal={toggleModal} />
        </div>

        <Link className="w-full" to="/minhas-refeicoes" >
          <Button
            className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
            onClick={handleUpdateMeal}
          >
            <Soup />
            <span>Salvar alterações</span>
          </Button>
        </Link>
        //TODO: TROCAR O LINK POR NAVIGATE, PORQUE O LINK TA TROCANDO DE PAGE MESMO SE O SAVE NÃO FOR CONCLUIDO.
        <When expr={isOpen}>
          <AddFoodCard onClose={toggleModal} />
        </When>
      </main>
    </>
  );
}

