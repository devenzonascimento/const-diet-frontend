import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MyFoodsListLoading() {
  return (
    <div className="w-full flex flex-col gap-4 overflow-hidden">
      {Array.from({ length: 15 }).map(() => (
        <div
          key={Math.random()}
          className="min-h-18 h-18 w-full p-2 flex items-center gap-2"
        >
          <div className="h-full aspect-square rounded-full overflow-hidden shrink-0">
            <Skeleton className="size-full bg-zinc-700" />
          </div>

          <div className="w-full flex flex-col justify-between gap-3">
            <div className="grid grid-cols-[1fr_auto] items-start">
              <Skeleton className="h-4 w-2/3 bg-zinc-700 rounded-none" />

              <Skeleton className="h-3 w-12 bg-zinc-700 rounded-none" />
            </div>

            <div className="w-full flex items-center gap-2">
              <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
              <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
              <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
              <Skeleton className="w-14 h-4 bg-zinc-700 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
