import { useMealContext } from "@/context/meal-context";
import { useMealFoodFormValidation } from "@/hooks/use-meal-food-form-validation";

import { ModalBackdrop } from "@/components/modal-backdrop";
import { DefaultInput } from "@/components/default-input"
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

import { Food, MealFood } from "@/types/types"

interface FoodCardModalProps {
  food: Food;
  onClose: VoidFunction;
}

export const MealFoodFormCard = ({ onClose, food }: FoodCardModalProps) => {

  const { addFoodToFoodList } = useMealContext()

  const { register, handleSubmit } = useMealFoodFormValidation(food)

  const onSubmit = (data: MealFood) => {
    addFoodToFoodList(data)
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-lg">

        <X size={32} className="absolute top-2 right-2" onClick={onClose} />

        <h2 className="text-2xl font-semibold text-center ">{food.name}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <DefaultInput label="Quantidade" {...register("quantity")} />
          <Button className="w-full bg-sky-700 hover:bg-sky-500">
            Adicionar alimento
          </Button>
        </form>
      </div>
    </ModalBackdrop>
  );
};