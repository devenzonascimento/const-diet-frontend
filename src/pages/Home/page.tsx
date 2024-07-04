import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center px-4">
      <Link
        to="meus-alimentos"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Alimentos</span>
      </Link>
      <Link
        to="minhas-refeicoes"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Refeições</span>
      </Link>
      <Link
        to="minhas-rotinas"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Rotinas</span>
      </Link>
      <Link
        to="meus-planos"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Planos</span>
      </Link>
    </main>
  )
}
