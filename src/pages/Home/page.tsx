import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center p-4 overflow-auto">
      <Link
        to="meu-plano-diario"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Meu plano para hoje</span>
      </Link>
      <Link
        to="meus-alimentos"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Meus Alimentos</span>
      </Link>
      <Link
        to="minhas-refeicoes"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Minhas Refeições</span>
      </Link>
      <Link
        to="minhas-rotinas"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Minhas Rotinas</span>
      </Link>
      <Link
        to="meus-planos"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Meus Planos</span>
      </Link>
    </main>
  )
}
