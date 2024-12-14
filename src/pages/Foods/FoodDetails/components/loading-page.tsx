import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function FoodDetailsLoadingPage() {
  return (
    <div className="flex-1 flex flex-col gap-28 bg-linear-to-b/oklch bg-highlight to-violet-400 to-20%">
      <header className="w-full flex items-center justify-between">
        <button
          type="button"
          className="size-14 flex items-center justify-center p-3"
        >
          <ArrowLeft className="size-full text-white shrink-0" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center gap-4 p-4  bg-zinc-900 rounded-t-[60px]">
        <div className="-mt-32 aspect-square size-36 p-1 bg-radial-[at_25%_25%] from-violet-600 to-violet-300 to-75% border-4 border-white rounded-full overflow-hidden">
          <Skeleton className="size-full bg-zinc-800 rounded-full" />
        </div>

        <Skeleton className="min-h-8 w-5/6 bg-zinc-700 rounded-none" />

        <Skeleton className="min-h-16 w-3/6 bg-zinc-700 rounded-none" />

        <div className="w-full grid grid-cols-2 grid-rows-3 gap-3">
          <Skeleton className="col-span-2 h-24 bg-zinc-700 rounded-xl" />

          <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
          <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
          <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
          <Skeleton className="h-24 bg-zinc-700 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
