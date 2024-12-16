import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/header'

export function EditFoodLoadingPage() {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header title="Editar alimento" leftButtonNavigateTo="/meus-alimentos" />

      <div className="flex-1 flex flex-col gap-4 p-4 bg-zinc-900">
        <div>
          <Skeleton className="h-[20px] w-3/5 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-[20px] w-4/5 my-1 bg-zinc-700 rounded-none" />
            <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
          </div>

          <div>
            <Skeleton className="h-[20px] w-3/5 my-1 bg-zinc-700 rounded-none" />
            <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
          </div>
        </div>

        <div>
          <Skeleton className="h-[20px] w-4/10 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-6/10 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-7/10 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-6/10 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-7/10 my-1 bg-zinc-700 rounded-none" />
          <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
        </div>

        <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-none" />
      </div>
    </div>
  )
}
