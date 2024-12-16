import React from 'react'
import { AppleIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FoodNotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 bg-zinc-900">
      <AppleIcon className="stroke-1 -mt-36 size-36 text-white fill-violet-500" />

      <h1 className="text-center text-2xl font-semibold text-white">
        Alimento não encontrado
      </h1>

      <Link
        to="/"
        className="p-2 w-full flex items-center justify-center bg-violet-500 text-white text-lg font-semibold rounded-lg"
      >
        Retornar a página inicial
      </Link>
    </div>
  )
}
