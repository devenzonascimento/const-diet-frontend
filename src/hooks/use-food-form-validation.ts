import { useEffect } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Food } from "@/types/types";

const foodFormSchema = z.object({
  name: z.string().min(3),
  quantity: z.coerce.number(),
  unit: z.enum(["GRAMS", "MILILITERS"]),
  calories: z.coerce.number(),
  carbohydrates: z.coerce.number(),
  proteins: z.coerce.number(),
  fats: z.coerce.number(),
  sodiums: z.coerce.number(),
  fibers: z.coerce.number(),
});

type FoodFormSchema = z.infer<typeof foodFormSchema>;

export const useFoodFormValidation = (food?: Food) => {
  const { register, handleSubmit, setValue } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: food,
  });

  useEffect(() => {
    if (food) {
      Object.entries(food).forEach(([key, value]) => {
        setValue(key as keyof FoodFormSchema, value);
      });
      setValue("quantity", 100);
    }
  }, [food, setValue]);

  return {
    register,
    handleSubmit,
  };
};
