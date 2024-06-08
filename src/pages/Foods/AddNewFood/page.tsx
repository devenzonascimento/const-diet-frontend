import { useFoodFormValidation } from "@/hooks/use-food-form-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { createFood } from "@/services/http/food/create-food";

import { convertToBase100 } from "@/functions/convert-to-base-100";

import { ArrowLeft, Camera } from "lucide-react";
import { DefaultInput } from "@/components/default-input";
import { SelectInput } from "@/components/select-input";
import { Button } from "@/components/ui/button";

import { CreateFood, Food } from "@/types/types";

import { UNIT_OPTIONS } from "@/constants/constants";

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
          carbohydrates: variables.carbohydrates,
          proteins: variables.proteins,
          fats: variables.fats,
          sodiums: variables.sodiums,
          fibers: variables.fibers,
        }]
      })
    },
  })

  const onSubmit = (data: CreateFood) => {
    const food = convertToBase100(data)

    createFoodFn(food)

    navigate("/my-foods")
  }

  return (
    <div className="h-screen px-4">
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
          <DefaultInput
            id="foodName-input"
            label="Nome do alimento"
            {...register("name")}
          />
          <fieldset className="w-full grid grid-cols-2 gap-4">
            <DefaultInput
              id="quantity-input"
              label="Quantidade"
              {...register("quantity")}
            />

            <SelectInput
              id="unit-input"
              label="Unidade"
              options={UNIT_OPTIONS}
              {...register("unit")}
            />
          </fieldset>
          <DefaultInput
            id="calories-input"
            label="Calorias"
            {...register("calories")}
          />
          <DefaultInput
            id="carbo-input"
            label="Carboidratos em gramas"
            {...register("carbohydrates")}
          />
          <DefaultInput
            id="protein-input"
            label="Proteínas em gramas"
            {...register("proteins")}
          />
          <DefaultInput
            id="fat-input"
            label="Gorduras em gramas"
            {...register("fats")}
          />
          <DefaultInput
            id="sodium-input"
            label="Sódios em gramas"
            {...register("sodiums")}
          />
          <DefaultInput
            id="fiber-input"
            label="Fibras em gramas"
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

