import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { RouteTypes } from '@/types/routes-types'

export function MealDetailsLoadingPage() {
  return (
    <div className="flex-1 flex flex-col gap-20 bg-linear-to-b/oklch bg-highlight to-violet-300 to-20%">
      <header className="sticky inset-0 z-10 w-full flex items-center justify-between">
        <Link
          to={RouteTypes.MyMealsPage}
          className="size-14 flex items-center justify-center p-3"
        >
          <ArrowLeft className="size-full text-white shrink-0" />
        </Link>
      </header>

      <div className="relative flex-1 flex flex-col gap-4 p-4 pt-24 bg-zinc-900 rounded-tr-[60px]">
        <div className="absolute top-0 -translate-y-1/2 left-4 size-36 p-1 bg-radial-[at_25%_25%] from-violet-700 to-violet-300 to-75% border-4 border-white rounded-full">
          <Skeleton className="size-full bg-zinc-800 rounded-full" />
        </div>

        <div className="absolute top-4 right-4 size-20 aspect-square flex flex-col items-center justify-center bg-zinc-700 rounded-full">
          <Skeleton className="size-full bg-zinc-800 rounded-full" />
        </div>

        <Skeleton className="min-h-6 w-4/6 bg-zinc-700 rounded-none" />

        <div className="flex flex-col gap-2">
          <Skeleton className="min-h-5 w-3/6 bg-zinc-700 rounded-none" />
          <Skeleton className="min-h-3 w-5/6 bg-zinc-700 rounded-none" />
          <Skeleton className="min-h-3 w-2/6 bg-zinc-700 rounded-none" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="min-h-5 w-3/6 bg-zinc-700 rounded-none" />
          <Skeleton className="ml-2 min-h-4 w-2/6 bg-zinc-700 rounded-none" />
          <Skeleton className="ml-2 min-h-4 w-2/6 bg-zinc-700 rounded-none" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="min-h-5 w-3/6 bg-zinc-700 rounded-none" />

          <div className="w-full grid grid-cols-2 grid-rows-3 gap-3">
            <Skeleton className="col-span-2 h-24 bg-zinc-700 rounded-xl" />

            <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
            <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
            <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
            <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
