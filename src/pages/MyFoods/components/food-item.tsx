import { FC } from "react";

interface FoodItemProps {
  food: {
    id: number;
    image: string;
    name: string;
    portion: number;
    carbo: number;
    protein: number;
    fat: number;
  };
}

const FoodItem: FC<FoodItemProps> = ({ food }) => {
  const { image, name, portion, carbo, protein, fat } = food;

  return (
    <li className="relative w-full flex gap-2 p-2 bg-white rounded-lg shadow-xl">
      <img
        className="w-20 h-20 object-cover rounded-md shadow-2xl"
        src={image}
        alt="food"
      />
      <div className="w-full flex flex-col justify-between">
        <h2 className="font-semibold text-gray-800">{name}</h2>
        <div className="w-full flex gap-2">
          <p className="px-1 block text-blue-600 bg-blue-100 rounded-lg">
            C: {`${carbo}g`}
          </p>
          <p className="px-1 block text-red-600 bg-red-100 rounded-lg">
            P: {`${protein}g`}
          </p>
          <p className="px-1 block text-orange-600 bg-orange-100 rounded-lg">
            G: {`${fat}g`}
          </p>
        </div>
      </div>

      <p className="absolute top-2 right-2 p-0.5 bg-sky-800 rounded-sm text-white ">{`${portion}g`}</p>
    </li>
  );
};

export default FoodItem;
