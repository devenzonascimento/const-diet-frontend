import useFetchFoodData from "@/hooks/useFetchFoodData";

interface FoodItemDescriptionProps {
  id: string;
  portion: number;
}

const FoodItemDescription = ({ id, portion }: FoodItemDescriptionProps) => {
  const { food } = useFetchFoodData(id);

  return (
    <li className="w-full p-1">
      <p className="text-sky-700">{`${portion} gramas de ${food?.name}`}</p>
    </li>
  );
};

export default FoodItemDescription;
