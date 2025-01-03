import React from 'react'
import { SoupIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RouteTypes } from '@/types/routes-types'

export function MealNotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 bg-zinc-900">
      <SoupIcon className="stroke-1 -mt-36 size-36 text-white fill-violet-500" />

      <h1 className="text-center text-2xl font-semibold text-white">
        Refeição não encontrada
      </h1>

      <Link
        to={RouteTypes.HomePage}
        className="p-2 w-full flex items-center justify-center bg-violet-500 text-white text-lg font-semibold rounded-lg"
      >
        Retornar a página inicial
      </Link>
    </div>
  )
}
