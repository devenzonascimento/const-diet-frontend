import { useLoginFormValidation, LoginSchema } from "@/hooks/use-login-form-validation";
import { useNavigate } from "react-router-dom";

import { userLogin } from "@/services/http/login/userLogin";

import { DefaultInput } from "@/components/default-input";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, errors } = useLoginFormValidation()

  const handleLogin = async (data: LoginSchema) => {
    const isLogged = await userLogin(data)

    if (isLogged) {
      navigate("/")
    } else {
      alert("Os seus dados estão incorretos!")
    }
    //TODO: IMPLEMENTAR TELA DE ERRO, QUANDO RETORNAR FALSE, ABRIR MODAL INFORMANDO QUE EMAIL E SENHA ESTÃO ERRADOS
  }

  return (
    <form className="w-80 p-8 flex flex-col justify-between items-center gap-4 bg-slate-100 rounded-xl" onSubmit={handleSubmit((data) => handleLogin(data))}>
      <h2 className="text-3xl font-semibold text-center text-gray-900">Entrar na conta</h2>
      <DefaultInput
        id="email"
        label="E-mail"
        {...register("email")}
        errorMessage={errors.email ? "Insira um email válido." : ""}
      />
      <DefaultInput
        id="password"
        label="Senha"
        {...register("password")}
        errorMessage={errors.password ? "A senha precisa ter no mínimo 8 caracteres." : ""}
      />
      <Button variant={"default"} className="w-full bg-gray-700">Entrar</Button>
    </form>
  )
}