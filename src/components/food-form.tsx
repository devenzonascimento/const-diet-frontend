import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const foodFormSchema = z.object({
  name: z.string(),
  calories: z.number(),
  carbohydrates: z.number(),
  proteins: z.number(),
  fats: z.number(),
  sodiums: z.number(),
  fibers: z.number(),
})

type FoodFormSchema = z.infer<typeof foodFormSchema>

interface FoodFormProps {
  foodData?: Partial<FoodFormSchema>
}

const FoodForm = ({foodData}: FoodFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: foodData
  });

  useEffect(() => {
    if (foodData) {
      Object.entries(foodData).forEach(([key, value]) => {
        setValue(key as keyof FoodFormSchema, value);
      });
    }
  }, [foodData, setValue]);

  const handleLogin = (data: FoodFormSchema) => {
    console.log(data)
  }

  return (
    <form
      className="w-full flex flex-col gap-6 py-4"
      onSubmit={handleSubmit((data) => handleLogin(data))}
    >
      <InputDefault
        id="foodName-input"
        label="Nome do alimento"
        {...register("name")}
      />
      <InputDefault
        id="carbo-input"
        label="Calorias"
        {...register("calories")}
      />
      <InputDefault
        id="carbo-input"
        label="Carboidratos em gramas"
        {...register("carbohydrates")}
      />
      <InputDefault
        id="protein-input"
        label="Proteínas em gramas"
        {...register("proteins")}
      />
      <InputDefault
        id="fat-input"
        label="Gorduras em gramas"
        {...register("fats")}
      />
      <InputDefault
        id="sodium-input"
        label="Sódios em gramas"
        {...register("sodiums")}
      />
      <InputDefault
        id="fiber-input"
        label="Fibra em gramas"
        {...register("fibers")}
      />

      <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500">
        Salvar alimento
      </Button>
    </form>
  );
};

export default FoodForm;
