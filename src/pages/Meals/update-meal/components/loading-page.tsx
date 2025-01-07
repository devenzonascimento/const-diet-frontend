import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/header'

export function UpdateMealLoadingPage() {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header title="Editar alimento" leftButtonNavigateTo="/meus-alimentos" />

      <div className="flex-1 flex flex-col gap-4 p-4">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <Skeleton className="h-[20px] w-2/5 my-1 bg-zinc-700 rounded-none" />
            <Skeleton className="h-[36px] w-full bg-zinc-700 rounded-md" />
          </div>
          <div>
            <Skeleton className="h-[20px] w-6/10 my-1 bg-zinc-700 rounded-none" />
            <Skeleton className="h-[94px] w-full bg-zinc-700 rounded-md" />
          </div>

          <div className="flex-1 grid grid-rows-[auto_1fr]">
            <div>
              <Skeleton className="h-[20px] w-5/10 my-1 bg-zinc-700 rounded-none" />
            </div>
            <div className="flex-1 py-2 flex flex-col gap-2 rounded-md overflow-hidden">
              {Array.from({ length: 5 }).map(() => (
                <Skeleton
                  key={Math.random()}
                  className="h-[40px] w-full bg-zinc-700 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        <Skeleton className="h-[48px] w-full bg-zinc-700 rounded-md" />
      </div>
    </div>
  )
}
