import { MealFood } from "@/types/types";

interface MealDescriptionProps {
  foods: MealFood[] | undefined
}

export const MealDescription = ({ foods }: MealDescriptionProps) => {

  const UNIT: Record<MealFood['unit'], string> = {
    "GRAMS": "g",
    "MILILITERS": "ml",
    "UNITS": "u",
  }

  return (
    <>
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
    </>
  );
};