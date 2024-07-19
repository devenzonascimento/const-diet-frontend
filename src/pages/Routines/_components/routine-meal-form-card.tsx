import { TimeSchema, useTimeValidation } from "@/hooks/use-time-validation";
import { useRoutineContext } from "@/context/routine-context"

import { ModalBackdrop } from "@/components/modal-backdrop";
import { SelectInput } from "@/components/select-input";
import { Button } from "@/components/ui/button";

import { Meal } from "@/types/types";

import { HOURS_OPTIONS, MINUTES_OPTIONS } from "@/constants/constants";

interface RoutineMealFormCardProps {
  meal: Meal;
  onClose: () => void;
}

export const RoutineMealFormCard = ({ meal, onClose }: RoutineMealFormCardProps) => {
  const { addMeal } = useRoutineContext()

  const onSubmit = (data: TimeSchema) => {
    const time = `${data.hour}:${data.minute}`

    addMeal({ meal, time })

    onClose()
  }

  const { register, handleSubmit } = useTimeValidation()

  return (
    <ModalBackdrop onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full h-fit mx-6 flex flex-col justify-between items-center gap-6 p-4 bg-slate-100 border-4 border-sky-500 rounded-lg"
      >
        <header className="w-full text-lg font-semibold text-center text-sky-950">
          <h1>
            Defina o horário da refeição
          </h1>
          <p>
            ({meal.name})
          </p>
        </header>
        <fieldset className="w-full flex items-center justify-between gap-4">
          <SelectInput
            label="Horas"
            {...register("hour")}
            options={HOURS_OPTIONS}
          />
          <SelectInput
            label="Minutos"
            {...register("minute")}
            options={MINUTES_OPTIONS}
          />
        </fieldset>
        <Button className="w-full bg-sky-700 hover:bg-sky-500">
          Adicionar refeição
        </Button>
      </form>
    </ModalBackdrop>
  );
};