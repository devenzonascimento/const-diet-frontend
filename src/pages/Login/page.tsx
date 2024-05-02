import InputDefault from "@/components/input-default";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center gap-8 bg-slate-200">
      <img className="mt-20" src="/assets/logo.svg" alt="" />
      <p className="text-3xl font-semibold text-center tracking-wider uppercase text-gray-900">Seja bem-vindo</p>
      <form className="w-80 p-8 flex flex-col justify-between items-center gap-8 bg-slate-100 rounded-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Entrar na conta</h2>
        <InputDefault id="email" label="E-mail" />
        <InputDefault id="password" label="Senha" />
        <Button variant={"default"} className="w-full bg-gray-700"> Entrar </Button>
      </form>
    </main>
  );
};

export default LoginPage;
