import { useEffect, useState } from "react";
import MealItem from "./meal-item";

const MealsList = () => {

  const [mealsList, setMealsList] = useState<Meal[]>([])
  
  useEffect(() => {
    const fetchData = async () => {

      const url = "src/data/meals.json"

      const response = await fetch(url)
      const responseJSON = await response.json()
      setMealsList(responseJSON)
    }

    fetchData()
    
  }, [])

  return (
    <ul className="w-full flex flex-col gap-6">
      {mealsList.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
