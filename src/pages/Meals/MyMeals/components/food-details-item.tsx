import { calculatecalories } from "@/functions/calculate-total-calories"
import { calculateTotalNutrients } from "@/functions/calculate-total-nutrients"

import { UNIT } from "@/constants/constants"

import { MealFood } from "@/types/types"

interface FoodDetailsItemProps {
  foodItem: MealFood
}

export const FoodDetailsItem = ({ foodItem }: FoodDetailsItemProps) => {

  const nutrients = calculateTotalNutrients([foodItem])

  const calories = calculatecalories([foodItem])

  const { food, quantity } = foodItem

  return (
    <li className="w-full h-fit flex flex-col items-center border-2 border-sky-700">
      <h3 className="w-full text-center border-2 border-sky-700">
        {`${quantity}${UNIT[food.unit]} de ${food.name}`}
      </h3>
      <table className="w-full text-center">
        <tbody>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Calorias
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {calories.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Carbohidratos
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {nutrients.carbohydrates.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Proteínas
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {nutrients.proteins.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Gorduras
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {nutrients.fats.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Sódio
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {nutrients.sodium.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              Fibras
            </td>
            <td className="border-2 border-sky-700 p-1 w-1/2" >
              {nutrients.fibers.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </li>
  );
}