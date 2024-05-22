import CaloriesBadge from "@/components/calories-badge";
import MacronutrientsBadge from "@/components/macronutrient-badges";
import ModalBackdrop from "@/components/modal-backdrop";
import { Button } from "@/components/ui/button";
import { deleteFood } from "@/services/http/food/delete-food";
import { Food } from "@/types/types";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./delete-button";

interface FoodCardModalProps {
  food: Food;
  onClose: VoidFunction;
}

const FoodCardModal = ({
  onClose,
  food: { id, name, calories, nutrients },
}: FoodCardModalProps) => {

  const navigate = useNavigate();

  const handleDeleteFood = () => {
    deleteFood(id);
    onClose();
    navigate("/my-foods");
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-8 bg-slate-100 border-4 border-sky-500 rounded-lg shadow-xl">
        <X size={32} className="absolute top-2 right-2" onClick={onClose} />
        <img
          //src={image}
          alt=""
          className="w-48 aspect-square border-4 border-sky-500 rounded-full"
        />
        <h1 className="text-2xl font-semibold text-center ">{name}</h1>
        <CaloriesBadge className="scale-150" calories={calories} />
        <MacronutrientsBadge className="scale-110" nutrients={nutrients} />
        <div className="flex gap-4">
          <Button type="button" className="w-32 bg-sky-700 hover:bg-sky-500"
            onClick={() => navigate(`/edit-food/${id}`)}>
            Editar alimento
          </Button >
          <DeleteButton OnDelete={handleDeleteFood}/>
        </div>
      </div>
    </ModalBackdrop>
  );
};
//TODO: DE ACORDO COM O CHAT, A MELHOR ABORDAGEM SERIA ATUALIZAR O DADOS LOCALMENTE
// AO INVES DE FAZER OUTRA REQUISIÇÃO PRO SERVER, E PARA EVITAR UM PROP DRILLING
// VOU PUXAR UMA ABORDAGEM USANDO CONTEXTO
export default FoodCardModal;
