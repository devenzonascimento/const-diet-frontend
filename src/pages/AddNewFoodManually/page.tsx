import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera } from "lucide-react";

import { Link } from "react-router-dom";

const AddNewFoodManuallyPage = () => {
  return (
    <div className="h-screen bg-gray-00 px-4">
      <header className="relative flex justify-center items-center py-4">
        <Link to="/my-foods">
          <ArrowLeft
            className="absolute top-4 left-0"
            size={32}
            onClick={() => console.log("voltar")}
          />
        </Link>
        <h1 className="text-xl font-semibold">Meus alimentos</h1>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 px-2">
        <div className="h-40 w-40 flex justify-center items-center bg-black rounded-xl">
          <Camera className="text-white" size={64} />
        </div>
        <form className="w-full flex flex-col gap-6 py-4">
          <InputDefault id="food-name" label="Nome do alimento" />
          <InputDefault id="portion" label="Porção em gramas" />
          <InputDefault id="carbo" label="Carboidratos em gramas" />
          <InputDefault id="protein" label="Proteínas em gramas" />
          <InputDefault id="fat" label="Gorduras gramas" />
          <Button className="w-full bg-sky-700 hover:bg-sky-500">
            Salvar alimento
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddNewFoodManuallyPage;
