import { UnitTypes } from '@/types/food-types'
import { z } from 'zod'

export const foodFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do alimento é obrigatório.' }),
  quantity: z.coerce.number(),
  unit: z.enum([UnitTypes.GRAMS, UnitTypes.MILILITERS]),
  calories: z.coerce.number(),
  carbohydrates: z.coerce.number(),
  proteins: z.coerce.number(),
  fats: z.coerce.number(),
  sodium: z.coerce.number(),
  fibers: z.coerce.number(),
})

export type FoodFormSchema = z.infer<typeof foodFormSchema>
