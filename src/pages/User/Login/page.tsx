import { useLoginFormValidation, LoginSchema } from "@/hooks/use-login-form-validation";
import { useNavigate } from "react-router-dom";

import { userLogin } from "@/services/http/login/userLogin";

import { AppleIcon } from "lucide-react";
import { DefaultInput } from "@/components/default-input";

export const LoginPage = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, errors } = useLoginFormValidation()

  const handleLogin = async (data: LoginSchema) => {
    const isLogged = await userLogin(data)

    if (isLogged) {
      navigate("/")
    } else {
      alert("Os seus dados estão incorretos!")
    }
  }

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
        onSubmit={handleSubmit(handleLogin)}
        className="h-4/6 w-full p-8 flex flex-col gap-8 items-center bg-white rounded-t-[3.5rem]"
      >
        <h2 className="text-3xl font-semibold text-center text-sky-950">
          Entre na sua conta
        </h2>
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
          <span>Não tem cadastro? </span>
          <a className="underline underline-offset-2">registre-se agora!</a>
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
