import LoginForm from "./components/login-form";

const LoginPage = () => {
  //const userId = localStorage.getItem("userId")
  //const token = localStorage.getItem("token")
  //console.log(userId, token)

  return (
    <main className="h-screen w-screen flex flex-col items-center gap-8 bg-slate-200">
      <img className="mt-20" src="/assets/logo.svg" alt="" />
      <p className="text-3xl font-semibold text-center tracking-wider uppercase text-gray-900">Seja bem-vindo</p>
      <LoginForm />
    </main>
  );
};

export default LoginPage;

