import { Link, useParams } from "react-router-dom";
import { useFetchFood } from "@/hooks/useFetchFood";
import { updateFood } from "@/services/http/food/update-food";

import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputDefault from "@/components/input-default";
import { useFoodFormValidation } from "@/hooks/useFoodFormValidation";

const EditFoodPage = () => {
  const { id } = useParams<string>();

  const { food } = useFetchFood(id)

  const { register, handleSubmit } = useFoodFormValidation(food)

  return (
    <div className="h-screen bg-gray-00 px-4">
      <header className="relative flex justify-center items-center py-4">
        <Link to="/my-foods">
          <ArrowLeft
            className="absolute top-4 left-0"
            size={32}
          />
        </Link>
        <h1 className="text-xl font-semibold">{food?.name ?? "...Loading"}</h1>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 px-2">
        <div className="h-40 aspect-square flex justify-center items-center bg-black rounded-xl">
          <Camera className="text-white" size={64} />
        </div>
        <form
          className="w-full flex flex-col gap-6 py-4"
          onSubmit={handleSubmit((data) => updateFood(data, id))}
        >
          <InputDefault
            id="foodName-input"
            label="Nome do alimento"
            {...register("name")}
          />
          <InputDefault
            id="carbo-input"
            label="Calorias"
            {...register("calories")}
          />
          <InputDefault
            id="carbo-input"
            label="Carboidratos em gramas"
            {...register("carbohydrates")}
          />
          <InputDefault
            id="protein-input"
            label="Proteínas em gramas"
            {...register("proteins")}
          />
          <InputDefault
            id="fat-input"
            label="Gorduras em gramas"
            {...register("fats")}
          />
          <InputDefault
            id="sodium-input"
            label="Sódios em gramas"
            {...register("sodiums")}
          />
          <InputDefault
            id="fiber-input"
            label="Fibra em gramas"
            {...register("fibers")}
          />

          <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500">
            Salvar alimento
          </Button>
        </form>
      </main>
    </div>
  );
};

export default EditFoodPage;
