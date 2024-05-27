export interface Food {
  id: string;
  name: string;
  calories: number;
  nutrients: Nutrients
}

export interface CreateFood {
  id?: string;
  name: string;
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
  sodiums: number;
  fibers: number;
}

export interface Meal {
  id: string;
  name: string;
  type?: string;
  description?: string;
  foods: MealFood[];
}

export interface MealFood {
  id: string;
  quantity: number;
  unit: string;
  food: Food;
}
