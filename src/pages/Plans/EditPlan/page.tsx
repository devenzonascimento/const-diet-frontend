import { Link } from "react-router-dom"

import { ArrowLeft } from "lucide-react"

export const EditPlanPage = () => {
  return (
    <div className="h-screen bg-slate-100 px-4">
      <header className="relative flex justify-center items-center py-4 text-sky-950">
        <Link to="/meus-planos">
          <ArrowLeft size={32} className="absolute top-4 left-0" />
        </Link>
        <h1 className="text-xl font-semibold">Editar plano</h1>
      </header>
      <main className="flex flex-col justify-between items-center gap-4 pb-6">
      </main>
    </div>
  )
}