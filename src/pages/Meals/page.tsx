import { ArrowLeft } from "lucide-react";

import { ProgressBar } from "./_components/progress-bar";
import { MealsList } from "./_components/meals-list";

const MyMealsPage = () => {
  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4">
        <ArrowLeft size={32} className="absolute top-4 left-0" />
        <h1 className="text-xl font-semibold">Plano de hoje</h1>
      </header>
      <main className="flex flex-col justify-between items-center gap-4">
        <ProgressBar />
        <MealsList />
      </main>
    </div>
  );
};

export default MyMealsPage;
