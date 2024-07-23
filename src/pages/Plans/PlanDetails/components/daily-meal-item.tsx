import { List } from "@/components/list";

import { UNIT } from "@/constants/constants";

export interface Meal {
  id: string;
  time: string;
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fibers: number;
  sodium: number;
  foods: MealFood[];
}

export interface MealFood {
  id: string;
  name: string;
  unit: "GRAMS" | "MILILITERS";
  quantity: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodium: number;
  fibers: number;
}

interface DailyMealItemProps {
  meal: Meal;
}

export const DailyMealItem = ({ meal }: DailyMealItemProps) => {
  
  return (
    <li className="flex items-center justify-between bg-sky-800 rounded-xl overflow-hidden font-semibold border border-sky-800">
      <details className="w-full flex flex-col gap-2 p-2 bg-white">
        <summary className=" text-sky-950 bg-white">
          {meal.name}
        </summary>
        <List
          className="gap-3 pt-2 pl-1"
          data={meal.foods}
          renderItem={({ item }) => (
            <li key={item.id} className="w-full text-sm text-sky-900 bg-white list-disc list-inside">
              {item.quantity}{UNIT[item.unit]} de {item.name}
            </li>
          )}          
        />
      </details>
      <span className="min-w-14 h-full py-2 flex items-center justify-center text-white">
        {meal.time}
      </span>
    </li>
  )
}
