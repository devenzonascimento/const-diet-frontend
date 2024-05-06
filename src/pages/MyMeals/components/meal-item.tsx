import MacronutrientsBadge from "@/pages/MyFoods/components/macronutrient-badges";

interface MealItemProps {
  meal: Meal;
}

const MealItem = ({ meal }: MealItemProps) => {
  const { id, foods, time } = meal;

  const calculateMealMacros = (foods: Food[]) => {
    let totalCarbo = 0;
    let totalProtein = 0;
    let totalFat = 0;

    foods.forEach((food) => {
      const { carbo, protein, fat } = food.nutrients;
      totalCarbo += carbo;
      totalProtein += protein;
      totalFat += fat;
    });

    const nutrients = {
      carbo: totalCarbo,
      protein: totalProtein,
      fat: totalFat,
    };

    return nutrients;
  };

  return (
    <div className="w-full flex bg-white rounded-2xl shadow-xl hover:scale-105 transition-all border-4 border-sky-700">
      <div className=" w-full flex flex-col justify-between items-center p-2">
        <h2 className=" w-full text-2xl uppercase font-semibold text-sky-700 text-center">
          #{id} Refeição
        </h2>
        <MacronutrientsBadge nutrients={calculateMealMacros(foods)} />
      </div>

      <div className="flex flex-col justify-center gap-2 p-1 bg-sky-700 rounded-r-sm">
        <p className=" text-lg font-semibold p-1 text-white text-center">
          {time.hour}H
        </p>
        <p className=" text-lg font-semibold p-1 text-white text-center">
          {time.minute}M
        </p>
      </div>
    </div>
  );
};

export default MealItem;
