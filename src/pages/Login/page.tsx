import { LoginForm } from "./components/login-form";

export const LoginPage = () => {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center gap-8 bg-slate-200">
      <p className="text-3xl font-semibold text-center tracking-wider uppercase text-gray-900">Seja bem-vindo</p>
      <LoginForm />
    </main>
  );
};
