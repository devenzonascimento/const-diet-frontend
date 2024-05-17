import CaloriesBadge from "@/components/calories-badge";
import MacronutrientsBadge from "@/components/macronutrient-badges";
import ModalBackdrop from "@/components/modal-backdrop";
import { Button } from "@/components/ui/button";
import { Food } from "@/types/types";
import { useNavigate } from "react-router-dom";

interface FoodCardModalProps {
  food: Food;
  onClose: VoidFunction;
}

const FoodCardModal = ({
  onClose,
  food: { id, name, calories, nutrients },
}: FoodCardModalProps) => {

    const navigate = useNavigate();

    const test = () => {
        console.log('chamou')
        navigate(`/edit-food/${id}`)
    }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-8 bg-slate-100 border-4 border-sky-500 rounded-lg shadow-xl">
        <img
          //src={image}
          alt=""
          className="w-48 aspect-square border-4 border-sky-500 rounded-full"
        />
        <h1 className="text-2xl font-semibold text-center ">{name}</h1>
        <CaloriesBadge className="scale-150" calories={calories} />
        <MacronutrientsBadge className="scale-110" nutrients={nutrients} />
        <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500"
        onClick={test}>
          Editar alimento
        </Button >
      </div>
    </ModalBackdrop>
  );
};

export default FoodCardModal;
