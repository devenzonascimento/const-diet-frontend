export interface Food {
  id: number
  name: string
  unit: 'GRAMS' | 'MILILITERS'
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export interface CreateFood {
  id?: number
  name: string
  unit: 'GRAMS' | 'MILILITERS'
  quantity: number
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  sodium: number
  fibers: number
}

export interface Meal {
  id: number
  name: string
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
  foods: MealFood[]
}

export interface MealFood {
  id?: string
  quantity: number
  food: Food
}

export interface Routine {
  id: number
  name: string
  water: number
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
  meals: RoutineMeal[]
}

export interface RoutineMeal {
  meal: Meal
  time: string
}

export interface RoutineMealCreate {
  mealId: number
  time: string
}

export type CycleIllustrationType = {
  day: 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'
  number: 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7'
}

export interface Plan {
  id: number
  name: string
  goal: string
  startDate: Date
  endDate: Date
  routines: DailyRoutineComplete[]
}

export interface DailyRoutine {
  id: number
  name: string
  date: Date
  status: 'PENDING' | 'COMPLETED' | 'MISSED'
  water: number
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
  meals: RoutineMeal[]
}

export interface DailyRoutineComplete {
  id: number
  name: string
  date: Date
  status: 'PENDING' | 'COMPLETED' | 'MISSED'
  water: number
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
  meals: DailyMealComplete[]
}

export interface DailyMealComplete {
  id: number
  time: string
  status: 'PENDING' | 'COMPLETED' | 'MISSED'
  name: string
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
  foods: FoodComplete[]
}

export interface FoodComplete {
  id: number
  name: string
  unit: 'GRAMS' | 'MILILITERS'
  quantity: number
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export interface DailyMeal {
  id: number
  time: string
  name: string
  calories: number
  carbohydrates: number
  proteins: number
  fats: number
  fibers: number
  sodium: number
}

export interface MealStatus {
  mealId: number
  time: string
  status: 'PENDING' | 'COMPLETED' | 'MISSED'
}
