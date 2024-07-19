import { useFoodFormValidation } from "@/hooks/use-food-form-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { createFood } from "@/services/http/food/create-food";

import { Header } from "@/components/ui/header";
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
          sodium: variables.sodium,
          fibers: variables.fibers,
        }]
      })
    },
  })

  const onSubmit = (data: CreateFood) => {
    createFoodFn(data)

    navigate("/meus-alimentos")
  }

  return (
    <>
      <Header
        title="Novo alimento"
        leftButtonNavigateTo="/meus-alimentos"
      />
      <form
        className="w-full flex flex-col gap-4 px-4 pb-4"
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
          id="fiber-input"
          label="Fibras em gramas"
          {...register("fibers")}
        />
        <DefaultInput
          id="sodium-input"
          label="Sódios em gramas"
          {...register("sodium")}
        />
        <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500">
          Salvar alimento
        </Button>
      </form>
    </>
  );
};

