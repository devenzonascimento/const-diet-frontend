import { UNIT } from "@/constants/constants";
import { MealFood } from "@/types/types";

interface MealDescriptionProps {
  foods: MealFood[] | undefined
}

export const MealDescription = ({ foods }: MealDescriptionProps) => {

  return (
    <>
      <h3 className=" text-lg text-center font-semibold text-sky-600">Lista de alimentos</h3>
      <ul className="flex flex-col gap-2 rounded-lg list-disc pl-8 py-2" >
        {foods?.map(({food, quantity}) => {
          return (
            <li key={food.id} className="w-full p-1 text-sky-700">
              {`${quantity}${UNIT[food.unit]} de ${food.name}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};