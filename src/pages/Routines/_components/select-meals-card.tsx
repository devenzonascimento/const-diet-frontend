import { useState } from "react";

import { ModalBackdrop } from "@/components/modal-backdrop";
import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { MealItem } from "./meal-item";

import { Meal } from "@/types/types";

interface SelectMealsCardProps {
  mealsList: Meal[];
  onClose: () => void;
}

export const SelectMealsCard = ({ mealsList, onClose }: SelectMealsCardProps) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMeals = mealsList?.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="h-[80%] w-[90%] flex flex-col gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-md">
        <h2 className="text-xl font-semibold text-center text-sky-950">
          Escolha uma refeição
        </h2>
        <SearchInput
          placeholder="Buscar alimento"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredMeals}
          renderItem={({ item }) => <MealItem key={item.id} meal={item} />}
        />
      </div>
    </ModalBackdrop>
  )
}