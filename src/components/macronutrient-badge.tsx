import React from 'react'
import { cn } from '@/lib/utils'
import { MacronutrientTypes } from '@/types/macronutrients-types'

type MacronutrientBadgeProps = {
  type: MacronutrientTypes
  value: number
  className?: string
}

export function MacronutrientBadge({
  type,
  value,
  className,
}: MacronutrientBadgeProps) {
  const macronutrientsMap: Record<MacronutrientTypes, string> = {
    Carbohydrate: 'Carboidratos',
    Protein: 'Proteínas',
    Fat: 'Gorduras',
    Fiber: 'Fíbras',
    Sodium: 'Sódio',
  } as const

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 p-2 rounded-xl bg-zinc-700 text-white',
        className,
      )}
    >
      <span className="text-xl font-semibold">{value.toFixed()}g</span>
      <span className="px-2">{macronutrientsMap[type]}</span>
      <div className="h-2 w-full bg-linear-to-r from-violet-500 to-violet-300 rounded-full" />
    </div>
  )
}
