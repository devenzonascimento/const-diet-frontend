import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useMealContext } from "@/context/meal-context"



import { getFood } from "@/services/http/food/get-food"
import { getFoodsList } from "@/services/http/food/get-foods-list"

import { ModalBackdrop } from "@/components/modal-backdrop"
import { Button } from "@/components/ui/button"

import { X, Utensils } from "lucide-react"

interface AddFoodCardProps {
  onClose: VoidFunction
}

interface FormData {
  foodId: string
  quantity: number
  unit: string
}

export const AddFoodCard = ({ onClose }: AddFoodCardProps) => {

  const handleFoodData = async ({ foodId, quantity, unit }: FormData) => {
    const food = await getFood(foodId)

    addFoodToFoodList({ quantity, unit, food })
  }

  const { data: foodsList } = useQuery({
    queryKey: ["foodsList"],
    queryFn: getFoodsList,
  })

  const { register, handleSubmit } = useForm<FormData>()

  const { addFoodToFoodList } = useMealContext()

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-8 bg-slate-100 border-4 border-sky-500 rounded-lg shadow-xl">
        <X size={32} className="absolute top-2 right-2" onClick={onClose} />
        <h1 className="text-2xl font-semibold text-center ">Escolha um alimento</h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFoodData)}
        >
          <select
            className="text-lg py-1 px-2 border rounded-md"
            {...register("foodId")}
          >
            {foodsList?.map((food) =>
              <option
                key={food.id}
                value={food.id}
                className="text-md"
              >
                {food.name}
              </option>
            )}
          </select>

          <fieldset className="flex gap-4">
            <input
              type="text"
              placeholder="100"
              id="quantity"
              className="w-32 text-lg py-1 px-2 border rounded-md placeholder:text-gray-700"
              {...register("quantity")}
            />

            <select
              className="w-32 text-lg py-1 px-2 border rounded-md"
              {...register("unit")}
            >
              <option value="GRAMS" >gramas</option>
              <option value="MILILITERS" >mililitros</option>
              <option value="UNITS" >unidades</option>
            </select>
          </fieldset>

          <Button
            type="submit"
            className="w-full flex gap-4 bg-sky-700 hover:bg-sky-500"
          >
            <Utensils />
            Colocar na refeição
          </Button>
        </form>
      </div>
    </ModalBackdrop>
  )
}