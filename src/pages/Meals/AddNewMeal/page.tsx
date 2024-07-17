import { useModalState } from "@/hooks/use-modal-state";
import { useMealContext } from "@/context/meal-context";

import { Link } from "react-router-dom";


import { When } from "@/components/when";

import { Button } from "@/components/ui/button";

import { Soup } from "lucide-react";
import { useEffect } from "react";
import { InputField } from "../_components/input-field";
import { FoodsBasket } from "../_components/foods-basket";
import { AddFoodCard } from "../_components/add-food-card";
import { Header } from "@/components/ui/header";


export const AddNewMealPage = () => {

  const { isOpen, toggleModal } = useModalState()

  const { handleCreateMeal, clearContext } = useMealContext()

  useEffect(() => {
    clearContext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header
        title="Criar refeição"
        leftButtonNavigateTo="/minhas-refeicoes"
      />
      <main className="flex flex-col justify-center items-center gap-8 px-4 pb-6">
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
    </>
  );
}

