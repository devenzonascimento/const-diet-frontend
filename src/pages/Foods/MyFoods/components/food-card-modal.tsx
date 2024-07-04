import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ModalBackdrop } from "@/components/modal-backdrop";
import { X } from "lucide-react";
import { CaloriesBadge } from "@/components/calories-badge";
import { MacronutrientsBadge } from "@/components/macronutrient-badges";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";

import { deleteFood } from "@/services/http/food/delete-food";

import { Food } from "@/types/types";

interface FoodCardModalProps {
  food: Food;
  onClose: VoidFunction;
}

export const FoodCardModal = ({
  onClose,
  food: { id, name, calories, ...nutrients },
}: FoodCardModalProps) => {

  const navigate = useNavigate();

  const queryClient = useQueryClient()

  const { mutateAsync: deleteFoodFn } = useMutation({
    mutationFn: deleteFood,
    onSuccess() {
      queryClient.setQueryData(
        ["foodsList"],
        (data: Food[]) => data.filter((food) => (food.id !== id))
      )
    },
  })

  const handleDeleteFood = () => {
    deleteFoodFn(id);
    onClose();
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-8 bg-slate-100 border-4 border-sky-500 rounded-lg shadow-xl">

        <X size={32} className="absolute top-2 right-2" onClick={onClose} />

        <img
          src="/assets/strawberry.jpg"
          alt=""
          className="w-48 aspect-square border-4 border-sky-500 rounded-full"
        />

        <h1 className="text-2xl font-semibold text-center ">{name}</h1>

        <CaloriesBadge className="scale-150" calories={calories} />

        <MacronutrientsBadge className="scale-110" nutrients={nutrients} />

        <div className="flex gap-4">
          <Button
            type="button"
            className="w-32 bg-sky-700 hover:bg-sky-500"
            onClick={() => navigate(`/editar-alimento/${id}`)}
          >
            Editar alimento
          </Button>

          <DeleteButton onDelete={handleDeleteFood} />
        </div>
      </div>
    </ModalBackdrop>
  );
};