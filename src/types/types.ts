export interface Food {
  id: string;
  name: string;
  unit: "GRAMS" | "MILILITERS";
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums: number;
  fibers: number;
}

export interface CreateFood {
  id?: string;
  name: string;
  unit: "GRAMS" | "MILILITERS";
  quantity: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums: number;
  fibers: number;
}

export interface Nutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums?: number;
  fibers?: number;
}

export interface Meal {
  id: string;
  name: string;
  foods: MealFood[];
}

export interface MealFood {
  id?: string;
  quantity: number;
  food: Food;
}

export interface Routine {
  id: string;
  name: string;
  water: number;
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
  totalSodiums: number;
  totalFibers: number;
  meals: DailyMeal[];
}

export interface DailyMeal {
  meal: Meal;
  time: string;
  status: "PENDING" | "COMPLETED" | "MISSED"
}

export interface DailyMealCreate {
  mealId: string;
  time: string;
  status: "PENDING" | "COMPLETED" | "MISSED"
}