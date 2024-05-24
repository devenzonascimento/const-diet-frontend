import { Button } from "@/components/ui/button";
import FoodItemDescription from "./food-item-description";
import { Square, SquareCheckBig } from "lucide-react";
import useToggleState from "@/hooks/useToggleState";
import { MealFood } from "@/types/types";

interface MealDescriptionProps {
  foods: MealFood[]
  isOpen: boolean;
}

const MealDescription = ({ foods, isOpen }: MealDescriptionProps) => {
  const { booleanExp, toggleBooleanExp } = useToggleState()
  return (
    <ul
      style={{ display: isOpen ? "flex" : "none" }}
      className="flex flex-col gap-2 p-4 border-t-2"
    >
      {foods.map((food) => {
        return (
          <FoodItemDescription
            key={food.id}
            foodId={food.foodId}
            quantity={food.quantity}
            unit={food.unit}
          />
        );
      })}
      <Button type="submit" className="flex gap-2 bg-sky-700 hover:bg-sky-500"
        onClick={toggleBooleanExp}
      >
        {booleanExp ?
          (
            <>
              <SquareCheckBig />
              <p>Refeição concluída</p>
            </>
          ) : (
            <>
              <Square />
            <p>Marcar como concluída</p>
            </>
          )
        }
      </Button>
    </ul>
  );
};

export default MealDescription;