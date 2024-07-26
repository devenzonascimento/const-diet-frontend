import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMealContext } from "@/context/meal-context";
import { useModalState } from "@/hooks/use-modal-state";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "@/components/header";
import { InputField } from "../_components/input-field";
import { FoodsBasket } from "../_components/foods-basket";
import { Soup } from "lucide-react";
import { Button } from "@/components/ui/button";
import { When } from "@/components/when";
import { AddFoodCard } from "../_components/add-food-card";
import { Meal } from "@/types/types";

interface RouteParams {
  mealId: string;
}

export const EditMealPage = () => {

  const navigate = useNavigate()

  const { mealId } = useParams<keyof RouteParams>() as RouteParams;

  const { isOpen, toggleModal } = useModalState()

  const { handleUpdateMeal, updateMealStates, setMealData } = useMealContext()

  const redirectToSuccess = () => {
    navigate("/minhas-refeicoes")
  };

  const queryClient = useQueryClient()

  const loadMealData = () => {
    const data = queryClient.getQueryData<Meal[]>(["mealsList"])

    const mealToLoad = data?.find(meal => meal.id === mealId)

    if (mealToLoad) {
      setMealData(mealToLoad)
    }
  }

  useEffect(() => {
    loadMealData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {updateMealStates.isPending && (
        <div className="z-10 fixed top-0 left-0 h-screen w-screen bg-black/70 flex items-center justify-center">
          <div className="h-40 w-60 bg-white flex items-center justify-center rounded-xl">
            <p className="text-2xl font-semibold">Aguarde...</p>
          </div>
        </div>
      )}
      <Header
        title="Editar refeição"
        leftButtonNavigateTo="/minhas-refeicoes"
      />
      <main className="w-full flex flex-col justify-center items-center gap-8 px-4 pb-6">
        <div
          className="w-full min-h-40 flex flex-col items-center border-4 border-sky-700 rounded-md"
        >
          <InputField />
          <FoodsBasket openFormModal={toggleModal} />
        </div>
        <Button
          className="w-full flex gap-2 bg-sky-700 hover:bg-sky-500"
          onClick={() => handleUpdateMeal(redirectToSuccess)}
        >
          <Soup />
          Salvar alterações
        </Button>
      </main>
      <When expr={isOpen}>
        <AddFoodCard onClose={toggleModal} />
      </When>
    </>
  );
}
