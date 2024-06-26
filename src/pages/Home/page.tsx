import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center px-4">
      <Link
        to="/my-foods"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Foods</span>
      </Link>
      <Link
        to="/my-meals"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Meals</span>
      </Link>
      <Link
        to="/my-routines"
        className="h-32 w-full flex justify-center items-center border-4 border-sky-700 rounded-md"
      >
        <span className="text-xl font-semibold text-sky-950">Routines</span>
      </Link>
    </main>
  )
}