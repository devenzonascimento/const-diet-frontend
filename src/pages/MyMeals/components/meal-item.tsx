import MacronutrientsBadge from "@/components/macronutrient-badges";
import { Button } from "@/components/ui/button";
import useFetchFoodData from "@/hooks/useFetchFoodData";
import { Meal } from "@/types/types";
import { ChevronDown } from "lucide-react";

interface MealItemProps {
  meal: Meal;
}

const MealItem = ({ meal }: MealItemProps) => {
  const { name, foods, time } = meal;

  return (
    <div className="w-full flex flex-col px-2 bg-white rounded-2xl shadow-xl border-4 border-sky-700">
      <div className=" w-full flex justify-between items-center">
        <Button variant={"ghost"} className="p-0">
          <ChevronDown className="text-sky-700" />
        </Button>
        <h2 className=" w-fit text-xl uppercase font-semibold text-sky-700 text-center">
          {name}
        </h2>
        <p className=" w-16 text-lg font-semibold px-1 text-white text-center bg-sky-700 rounded-lg">
          {time.hour}:{time.minute}
        </p>
      </div>

    </div>
  );
};
//TODO: fazer pique que um faq para clicar e abrir a lista de alimentos, e ao mesmo tempo ser uma todo list
export default MealItem;

interface DescriptionProps {
  foods: DescriptionItemProps[];
}

const Description = ({ foods }: DescriptionProps) => {
  return (
    <ul className="flex flex-col gap-2 px-4">
      {foods.map((food) => {
        return (
          <DescriptionItem
            key={food.id}
            id={food.id}
            portion={food.portion}
          />
        );
      })}
    </ul>
  );
};

interface DescriptionItemProps {
  id: string;
  portion: number;
}

const DescriptionItem = ({ id, portion }: DescriptionItemProps) => {
  const { food } = useFetchFoodData(id);

  return (
    <li className="w-full p-1">
      <p className="text-sky-700">{`${portion} gramas de ${food?.name}`}</p>
    </li>
  );
};
