import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useLoginFormValidation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return {
    register,
    handleSubmit,
    errors
  };
};
