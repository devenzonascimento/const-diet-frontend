import { Link, useNavigate, useParams } from "react-router-dom";
import { useFoodFormValidation } from "@/hooks/use-food-form-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getFood } from "@/services/http/food/get-food";
import { updateFood } from "@/services/http/food/update-food";

import { ArrowLeft, Camera } from "lucide-react";
import { DefaultInput } from "@/components/default-input";
import { SelectInput } from "@/components/select-input";
import { Button } from "@/components/ui/button";

import { CreateFood, Food } from "@/types/types";

import { UNIT_OPTIONS } from "@/constants/constants";

interface RouteParams {
  foodId: string;
}

export const EditFoodPage = () => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const params = useParams<keyof RouteParams>() as RouteParams;

  const { foodId } = params;

  const { data: food } = useQuery({
    queryKey: ["food"],
    queryFn: () => getFood(foodId),
  })

  const { register, handleSubmit } = useFoodFormValidation(food)

  const { mutateAsync: updateFoodFn } = useMutation({
    mutationFn: updateFood,
    onSuccess(_, foodData) {
      queryClient.setQueryData(
        ["foodsList"],
        (data: Food[]) => data.map((food) => food.id === foodId ? foodData : food)
      )
    },
  })

  const onSubmit = (data: CreateFood) => {
    updateFoodFn({ id: foodId, ...data })
    
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
        <h1 className="text-xl font-semibold">{food?.name ?? "...Loading"}</h1>
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
