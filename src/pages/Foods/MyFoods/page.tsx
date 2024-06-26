import { Link } from "react-router-dom";

import { FoodsList } from "./components/foods-list";

import { ArrowLeft, CirclePlus } from "lucide-react";
import { FoodItem } from "./components/food-item";

export const MyFoodsPage = () => {

  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Meus alimentos</h1>
        <Link to="/add-new-food">
          <CirclePlus size={32} className="absolute top-4 right-0" />
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 pb-6">
        <FoodsList ItemComponent={FoodItem}/>
      </main>
    </div>
  );
};
