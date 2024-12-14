import React from 'react'
import { cn } from '@/lib/utils'
import { FlameIcon } from 'lucide-react'

interface CaloriesBadgeProps {
  calories: number
  className?: string
}

export const CaloriesBadge = ({ className, calories }: CaloriesBadgeProps) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <FlameIcon className="size-4.5 text-white fill-violet-300" />

      <p className="mt-0.5 text-sm leading-4.5 text-white font-semibold">
        {calories.toFixed()}
      </p>
    </div>
  )
}
