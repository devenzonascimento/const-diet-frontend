import { MealsList } from "./components/meals-list";
import { Header } from "@/components/ui/header";

export const MyMealsPage = () => {
  return (
    <>
      <Header
        title="Minhas refeições"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/nova-refeicao"
      />
      <main className="flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <MealsList />
      </main>
    </>
  );
};
