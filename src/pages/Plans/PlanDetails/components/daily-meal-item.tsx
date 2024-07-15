import { List } from "@/components/list";

import { DailyMeal } from "@/types/types";

interface DailyMealItemProps {
  meal: DailyMeal;
}

export const DailyMealItem = ({ meal }: DailyMealItemProps) => {
  return (
    <li className="flex items-center justify-between bg-sky-700 rounded-xl overflow-hidden font-semibold border border-sky-800">
      <details className="w-full flex flex-col gap-2 p-2 bg-white">
        <summary className=" text-sky-950 bg-white">
          {meal.name}
        </summary>
        <List
          className="gap-3 pt-2 pl-2"
          data={meal.foods}
          renderItem={({ item }) => (
            <li key={item.id} className="w-full text-sm text-sky-900 bg-white">
              {item.quantity}g de {item.name}
            </li>
          )}          
        />
      </details>
      <span className="w-20 h-full p-2 flex items-center justify-center text-white">
        {meal.time}
      </span>
    </li>
  )
}

/*
<li className="flex items-center justify-between bg-sky-700 rounded-xl overflow-hidden font-semibold border border-sky-800">
  <span className="w-full p-2 text-sky-950 bg-white">
    {meal.name}
  </span>
  <span className="w-20 h-full p-2 flex items-center justify-center text-white">
    {meal.time}
  </span>
</li>
*/