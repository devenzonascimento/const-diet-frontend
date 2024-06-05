import { useFoodFormValidation } from "@/hooks/useFoodFormValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFood } from "@/services/http/food/create-food";

import { InputDefault } from "@/components/input-default";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CreateFood, Food } from "@/types/types";

export const AddNewFoodPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit } = useFoodFormValidation()

  const queryClient = useQueryClient()

  const { mutateAsync: createFoodFn } = useMutation({
    mutationFn: createFood,
    onSuccess(_, variables) {
      queryClient.setQueryData(["foodsList"], (data: Food[]) => {
        return [...data, {
          id: crypto.randomUUID,
          name: variables.name,
          calories: variables.calories,
          nutrients: {
            carbohydrates: variables.carbohydrates,
            proteins: variables.proteins,
            fats: variables.fats,
            sodiums: variables.sodiums,
            fibers: variables.fibers,
          }
        }]
      })
    },
  })

  const onSubmit = (data: CreateFood) => {
    createFoodFn(data)
    navigate("/my-foods")
  }

  return (
    <div className="h-screen bg-gray-00 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/my-foods">
          <ArrowLeft
            className="absolute top-4 left-0"
            size={32}
          />
        </Link>
        <h1 className="text-xl font-semibold">Novo alimento</h1>
      </header>
      <main className="flex flex-col justify-center items-center gap-8 px-2">
        <div className="h-40 aspect-square flex justify-center items-center bg-black rounded-xl">
          <Camera className="text-white" size={64} />
        </div>
        <form
          className="w-full flex flex-col gap-6 py-4"
          onSubmit={handleSubmit(onSubmit)}
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
