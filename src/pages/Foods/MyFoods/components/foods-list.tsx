import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getFoodsList } from "@/services/http/food/get-foods-list";

import { SearchInput } from "@/components/search-input";
import { FoodItem } from "./food-item";

export const FoodsList = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: foodsList } = useQuery({
    queryKey: ["foodsList"],
    queryFn: getFoodsList,
  })

  const filteredFoods = foodsList?.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchInput
        placeholder="Buscar alimento"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <ul className="w-full flex flex-col gap-6">
        {filteredFoods?.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </ul>
    </>
  );
};