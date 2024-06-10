import { ModalBackdrop } from "@/components/modal-backdrop"
import { FoodsList } from "@/pages/Foods/MyFoods/components/foods-list"
import { FoodItem } from "./food-item"

import { X } from "lucide-react"

interface AddFoodCardProps {
  onClose: VoidFunction
}

export const AddFoodCard = ({ onClose }: AddFoodCardProps) => {
  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="relative w-full max-h-[80%] mx-6 flex flex-col justify-between items-center gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-lg shadow-xl"
      >
        <X size={32} className="absolute top-2 right-2" onClick={onClose} />
        <h1 className="text-2xl font-semibold text-center mt-4">Escolha um alimento</h1>
        <FoodsList ItemComponent={FoodItem} />
      </div>
    </ModalBackdrop>
  )
}
