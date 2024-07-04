import { ArrowLeft, CirclePlus } from "lucide-react";

import { MealsList } from "./components/meals-list";
import { Link } from "react-router-dom";

export const MyMealsPage = () => {
  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Minhas refeições</h1>
        <Link to="/nova-refeicao">
          <CirclePlus size={32} className="absolute top-4 right-0" />
        </Link>
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">
        <MealsList />
      </main>
    </div>
  );
};
