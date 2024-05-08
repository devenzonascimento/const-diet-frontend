import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

const FoodForm = () => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  //console.log(errors);

  return (
    <form
      className="w-full flex flex-col gap-6 py-4"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <InputDefault
        id="foodName-input"
        label="Nome do alimento"
        {...register("foodName")}
      />
      <InputDefault
        id="portion-input"
        label="Porção em gramas"
        {...register("portion")}
      />
      <InputDefault
        id="carbo-input"
        label="Calorias"
        {...register("calories")}
      />
      <InputDefault
        id="carbo-input"
        label="Carboidratos em gramas"
        {...register("carbo")}
      />
      <InputDefault
        id="protein-input"
        label="Proteína em gramas"
        {...register("protein")}
      />
      <InputDefault
        id="fat-input"
        label="Grodura em gramas"
        {...register("fat")}
      />

      <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-500">
        Salvar alimento
      </Button>
    </form>
  );
};

export default FoodForm;
