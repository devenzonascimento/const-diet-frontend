export interface Food {
  id: string;
  //image: string;
  name: string;
  calories: number;
  nutrients: Nutrients;
}

export interface Nutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodium: number;
  fiber: number;
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
  foodId: string;
  mealId: string;
}
