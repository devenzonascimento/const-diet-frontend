import useFetchFoodData from "@/hooks/useFetchFoodData";

import { Link, useParams } from "react-router-dom";

import FoodForm from "../../../components/food-form";

import { ArrowLeft, Camera } from "lucide-react";

const EditFoodPage = () => {
  const { id } = useParams();

  const { food } = useFetchFoodData(id);
  //TODO: Preciso fazer com que o form já venho com os valores de food

  return (
    <div className="h-screen bg-gray-00 px-4">
      <header className="relative flex justify-center items-center py-4">
        <Link to="/my-foods">
          <ArrowLeft
            className="absolute top-4 left-0"
            size={32}
          />
        </Link>
        <h1 className="text-xl font-semibold">{food?.name}</h1>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 px-2">
        <div className="h-40 aspect-square flex justify-center items-center bg-black rounded-xl">
          <Camera className="text-white" size={64} />
        </div>
        <FoodForm />
      </main>
    </div>
  );
};

export default EditFoodPage;
