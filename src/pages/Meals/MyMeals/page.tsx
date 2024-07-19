import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMealsList } from "@/services/http/meal/get-meals-list";

import { Header } from "@/components/ui/header";
import { SearchInput } from "@/components/search-input";
import { List } from "@/components/list";
import { MealItem } from "./components/meal-item";
import { MealsListLoading } from "./components/meals-list-loading";

export const MyMealsPage = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: mealsList, isPending } = useQuery({
    queryKey: ["mealsList"],
    queryFn: getMealsList,
  })

  const filteredList = mealsList?.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Minhas refeições"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/nova-refeicao"
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <SearchInput
          placeholder="Buscar rotina"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <List
          data={filteredList ?? []}
          renderItem={({ item }) => <MealItem key={item.id} meal={item} />}
        />
        {isPending && <MealsListLoading />}
      </main>
    </>
  );
};
