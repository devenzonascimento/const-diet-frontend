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
  unit: string;
  food: Food;
}
