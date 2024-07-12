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
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
  totalSodiums: number;
  totalFibers: number;
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
  meals: RoutineMeal[];
}

export interface RoutineMeal {
  meal: Meal;
  time: string;
}

export interface RoutineMealCreate {
  mealId: string;
  time: string;
}

export type CycleIllustrationType = {
  day: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';
  number: "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7";
}

export interface Plan {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  routines: Routine[];
}