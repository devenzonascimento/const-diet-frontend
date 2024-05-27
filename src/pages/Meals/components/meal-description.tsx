import { MealFood } from "@/types/types";

interface MealDescriptionProps {
  foods: MealFood[] | undefined
  isOpen: boolean;
}

export const MealDescription = ({ foods, isOpen }: MealDescriptionProps) => {

  return (
    <ul
      style={{ display: isOpen ? "flex" : "none" }}
      className="flex flex-col gap-2 p-4 border-t-2"
    >
      {foods?.map((foodItem) => {
        return (
          <li key={foodItem.id} className="w-full p-1">
            <p className="text-sky-700">
              {`${foodItem.quantity} gramas de ${foodItem.food.name}`}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
