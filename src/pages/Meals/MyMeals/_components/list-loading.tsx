import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MyMealsListLoading() {
  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden">
      {Array.from({ length: 15 }).map(() => (
        <div
          key={Math.random()}
          className="min-h-32 h-18 w-full p-2 flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <div className="h-14 aspect-square rounded-full overflow-hidden shrink-0">
              <Skeleton className="size-full bg-zinc-700" />
            </div>

            <div className="flex-1 grid grid-rows-2 gap-1">
              <div className="pt-2 grid grid-cols-[1fr_auto] items-start">
                <Skeleton className="h-3 w-2/3 bg-zinc-700 rounded-none" />

                <Skeleton className="h-3 w-12 bg-zinc-700 rounded-none" />
              </div>

              <Skeleton className="mt-1 h-3 w-5/6 bg-zinc-700 rounded-none" />
            </div>
          </div>

          <Skeleton className="h-3 w-2/3 bg-zinc-700 rounded-none" />

          <div className="w-full flex items-center gap-2">
            <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
            <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
            <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
            <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
            <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
