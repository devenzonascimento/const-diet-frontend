import { UnitTypes } from '@/types/food-types'
import { z } from 'zod'

export const foodFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do alimento é obrigatório.' }),
  unit: z.enum([UnitTypes.Grams, UnitTypes.Mililiters]),
  quantity: z.coerce
    .number()
    .nonnegative({ message: 'A quantidade não pode ser menor que zero.' }),
  calories: z.coerce.number().nonnegative({
    message: 'A quantidade de calorias não pode ser menor que zero.',
  }),
  carbohydrates: z.coerce.number().nonnegative({
    message: 'A quantidade de carboidratos não pode ser menor que zero.',
  }),
  proteins: z.coerce.number().nonnegative({
    message: 'A quantidade de proteínas não pode ser menor que zero.',
  }),
  fats: z.coerce.number().nonnegative({
    message: 'A quantidade de gorduras não pode ser menor que zero.',
  }),
  sodium: z.coerce.number().nonnegative({
    message: 'A quantidade de sódio não pode ser menor que zero.',
  }),
  fibers: z.coerce.number().nonnegative({
    message: 'A quantidade de fibras não pode ser menor que zero.',
  }),
})

export type FoodFormSchema = z.infer<typeof foodFormSchema>
