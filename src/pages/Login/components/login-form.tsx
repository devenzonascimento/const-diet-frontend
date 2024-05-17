import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";
import { userLogin } from "@/services/http/login/userLogin";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  //console.log(errors)

  const handleLogin = (data: LoginSchema) => {
    userLogin(data)
  }

  return (
    <form className="w-80 p-8 flex flex-col justify-between items-center gap-4 bg-slate-100 rounded-xl" onSubmit={handleSubmit((data) => handleLogin(data))}>
      <h2 className="text-3xl font-semibold text-center text-gray-900">Entrar na conta</h2>
      <InputDefault
        id="email"
        label="E-mail"
        {...register("email")}
        errorMessage={errors.email ? "Insira um email válido." : ""}
      />
      <InputDefault
        id="password"
        label="Senha"
        {...register("password")}
        errorMessage={errors.password ? "A senha precisa ter no mínimo 8 caracteres." : ""}
      />
      <Button variant={"default"} className="w-full bg-gray-700"> Entrar </Button>
    </form>
  )
}
//TODO: Melhorar as frases para error de email e senha
export default LoginForm