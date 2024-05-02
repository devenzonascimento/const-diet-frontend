import InputSearch from "@/components/input-search";
import { ArrowLeft, CirclePlus } from "lucide-react";
import FoodsList from "./components/foods-list";

const MyFoodsPage = () => {
  return (
    <div className="bg-gray-200">
      <header className="flex justify-between items-center p-4">
        <ArrowLeft size={32} onClick={() => (console.log("voltar"))} />
        <h1 className="text-xl font-semibold">Meus alimentos</h1>
        <CirclePlus size={32} />
      </header>
      <main className="flex flex-col justify-center items-center px-4">
        <InputSearch />
        <FoodsList />
      </main>
    </div>
  );
};

export default MyFoodsPage;
