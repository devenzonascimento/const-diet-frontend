import { calculateTotalNutrients } from "@/functions/calculate-total-nutrients";

import MacronutrientsBadge from "@/components/macronutrient-badges";

import {  MealFood } from "@/types/types";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";


interface MealDescriptionProps {
  foods: MealFood[] | undefined
  isOpen: boolean;
  deleteMeal: VoidFunction
}

export const MealDescription = ({ foods, isOpen, deleteMeal }: MealDescriptionProps) => {

  return (
    <ul
      style={{ display: isOpen ? "flex" : "none" }}
      className="flex flex-col gap-2 p-4 border-t-2"
    >
      {foods?.map((foodItem) => {
        return (
          <li key={foodItem.id} className="w-full p-1 text-center">
            <p className="text-sky-700">
              {`${foodItem.quantity} gramas de ${foodItem.food.name}`}
            </p>
          </li>
        );
      })}
      <MacronutrientsBadge className="m-auto mt-6" nutrients={calculateTotalNutrients(foods)} />
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          className="w-32 bg-sky-700 hover:bg-sky-500"
          onClick={() => console.log(`/edit`)}
        >
          Editar alimento
        </Button>
        <DeleteButton onDelete={deleteMeal} />
      </div>
    </ul>
  );
};