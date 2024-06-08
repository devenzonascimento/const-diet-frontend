import { MealFood } from "@/types/types";

export const UNIT: Record<MealFood['unit'], string> = {
  "GRAMS": "g",
  "MILILITERS": "ml",
  "UNITS": "u",
}

export const UNIT_OPTIONS = [
  { text: "Gramas", value: "GRAMS" },
  { text: "Mililitros", value: "MILILITERS" },
]