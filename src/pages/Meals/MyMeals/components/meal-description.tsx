import { MealFood } from "@/types/types";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";


interface MealDescriptionProps {
  foods: MealFood[] | undefined
  isOpen: boolean;
  deleteMeal: VoidFunction
}

export const MealDescription = ({ foods, isOpen, deleteMeal }: MealDescriptionProps) => {

  const UNIT: Record<MealFood['unit'], string> = {
    "GRAMS": "g",
    "MILILITERS": "ml",
    "UNITS": "u",
  }

  return (
    <div
      style={{ display: isOpen ? "flex" : "none" }}
      className="flex flex-col gap-2 p-4 border-t-2"
    >
      <h3 className=" text-lg text-center font-semibold text-sky-600">Lista de alimentos</h3>
      <ul className="flex flex-col gap-2 rounded-lg list-disc pl-8 py-2" >
        {foods?.map((foodItem) => {
          return (
            <li key={foodItem.id} className="w-full p-1 text-sky-700">
              {`${foodItem.quantity}${UNIT[foodItem.unit]} de ${foodItem.food.name}`}
            </li>
          );
        })}
      </ul>

      <Button
        type="button"
        className="w-full bg-white text-sky-700 border-2 border-sky-700"
      >
        Ver mais detalhes
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          className="w-full bg-sky-700 hover:bg-sky-500"
          onClick={() => console.log(`/edit`)}
        >
          Editar refeição
        </Button>
        <DeleteButton onDelete={deleteMeal} />
      </div>
    </div>
  );
};