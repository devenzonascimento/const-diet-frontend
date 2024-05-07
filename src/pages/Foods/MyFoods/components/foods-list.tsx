import { useEffect, useState } from "react";
import FoodItem from "./food-item";

const FoodsList = () => {

  const [foodsList, setFoodsList] = useState<Food[]>([])
  
  useEffect(() => {
    const fetchData = async () => {

      const url = "src/data/foods.json"

      const response = await fetch(url)
      const responseJSON = await response.json()
      setFoodsList(responseJSON)
    }

    fetchData()
    
  }, [])

  return (
    <ul className="w-full flex flex-col gap-6">
        {foodsList.map((food) => (
            <FoodItem key={food.id} food={food}/>
        ))}
    </ul>
  );
};

export default FoodsList;
