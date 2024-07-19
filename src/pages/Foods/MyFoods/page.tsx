import { FoodsList } from "./components/foods-list";
import { FoodItem } from "./components/food-item";
import { Header } from "@/components/header";

export const MyFoodsPage = () => {
  return (
    <>
      <Header
        title="Meus alimentos"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/novo-alimento"
      />
      <main className="flex flex-col justify-center items-center gap-8 px-4 pb-6">
        <FoodsList ItemComponent={FoodItem} />
      </main>
    </>
  );
};
