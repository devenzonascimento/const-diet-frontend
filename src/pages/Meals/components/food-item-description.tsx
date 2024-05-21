import { useFetchFood } from "@/hooks/useFetchFood";

interface FoodItemDescriptionProps {
  foodId: string;
  quantity: number;
  unit: string
}

const FoodItemDescription = ({ foodId, quantity }: FoodItemDescriptionProps) => {
  const { food } = useFetchFood(foodId);

  return (
    <li className="w-full p-1">
      <p className="text-sky-700">{`${quantity} gramas de ${food?.name}`}</p>
    </li>
  );
};

export default FoodItemDescription;
