import { UnitTypes } from '@/types/food-types'
import { z } from 'zod'

export const mealFoodSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unit: z.enum([UnitTypes.Grams, UnitTypes.Mililiters]),
  quantity: z.number().positive(),
  calories: z.number().nonnegative(),
  macronutrients: z.object({
    carbohydrates: z.number().nonnegative(),
    proteins: z.number().nonnegative(),
    fats: z.number().nonnegative(),
    sodium: z.number().nonnegative(),
    fibers: z.number().nonnegative(),
  }),
})

export const mealFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome da refeição é obrigatório.' }),
  description: z.string(),
  foods: z
    .array(mealFoodSchema)
    .min(1, { message: 'Uma refeição deve possuir ao menos um alimento' })
    .default([]),
})

export type MealFormSchema = z.infer<typeof mealFormSchema>
