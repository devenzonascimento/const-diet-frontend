import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { accountService } from "@/services/http/account/account-service";

import { AppleIcon } from "lucide-react";
import { DefaultInput } from "@/components/default-input";
import { useMutation } from "@tanstack/react-query";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: registerFn } = useMutation({
    mutationFn: accountService.register,
    onSuccess(isLogged) {
      if (!isLogged) {
        alert("Este e-mail já está cadastrado!")
        return 
      }

      navigate("/informacoes-adicionais")
    }
  })

  return (
    <div
      className="flex-1 flex flex-col justify-between gap-6 bg-sky-600"
    >
      <header className="w-full pt-4 flex flex-col items-center gap-4">
        <div className="h-32 w-32 flex items-center justify-center border-4 border-white rounded-full">
          <AppleIcon size={80} strokeWidth={1.2} className="text-white fill-sky-400" />
        </div>
        <h1 className="text-4xl font-semibold text-white">Seja Bem-vindo!</h1>
      </header>
      <form
        onSubmit={handleSubmit(data => registerFn(data))}
        className="h-4/6 w-full p-8 flex flex-col gap-6 items-center bg-white rounded-t-[3.5rem]"
      >
        <h2 className="text-3xl font-semibold text-center text-sky-950">
          Crie sua conta
        </h2>
        <DefaultInput
          id="email"
          type="text"
          label="Nome Completo"
          {...register("name")}
          errorMessage={errors.name ? "O nome precisa ter no mínimo 2 caracteres." : ""}
        />
        <DefaultInput
          id="email"
          type="email"
          label="E-mail"
          {...register("email")}
          errorMessage={errors.email ? "Insira um email válido." : ""}
        />
        <DefaultInput
          id="password"
          type="password"
          label="Senha"
          {...register("password")}
          errorMessage={errors.password ? "A senha precisa ter no mínimo 8 caracteres." : ""}
        />
        <p className="font-medium text-sky-900">
          <span>Já possui uma conta? </span>
          <Link to="/login" className="underline underline-offset-2">
            entrar agora!
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-gradient-to-r bg-sky-700 text-white text-lg font-semibold py-2 rounded-lg shadow-xl"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};
