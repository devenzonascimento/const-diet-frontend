import { z } from 'zod'

export const addFoodSchema = z.object({
  name: z.string().min(1, { message: 'Nome do alimento é obrigatório.' }),
  quantity: z.coerce.number(),
  unit: z.enum(['GRAMS', 'MILILITERS']),
  calories: z.coerce.number(),
  carbohydrates: z.coerce.number(),
  proteins: z.coerce.number(),
  fats: z.coerce.number(),
  sodium: z.coerce.number(),
  fibers: z.coerce.number(),
})

export type AddFoodSchema = z.infer<typeof addFoodSchema>
