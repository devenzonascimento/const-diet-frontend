import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const timeSchema = z.object({
  hour: z.string().min(2).max(2),
  minute: z.string().min(2).max(2),
});

export type TimeSchema = z.infer<typeof timeSchema>;

export const useTimeValidation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TimeSchema>({
    resolver: zodResolver(timeSchema),
  });

  return {
    register,
    handleSubmit,
    errors
  };
};