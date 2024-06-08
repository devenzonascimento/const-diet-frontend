import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <main className="h-screen flex gap-4 justify-center items-center">
      <Link to="/my-foods">
        <div className="h-24 w-24 flex justify-center items-center border-4 border-sky-700 rounded-md">
          <span className="text-xl font-semibold text-sky-950">Foods</span>
        </div>
      </Link>
      <Link to="/my-meals">
      <div className="h-24 w-24 flex justify-center items-center border-4 border-sky-700 rounded-md">
          <span className="text-xl font-semibold text-sky-950">Meals</span>
        </div>
      </Link>
    </main>
  )
}