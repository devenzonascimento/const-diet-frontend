import React, { useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { cn } from '@/lib/utils'
import { MacronutrientTag } from './macronutrient-tag'
import {
  Macronutrients,
  MacronutrientTypes,
} from '@/types/macronutrients-types'

const order: Array<keyof Macronutrients> = [
  'carbohydrates',
  'proteins',
  'fats',
  'fibers',
  'sodium',
]

type MacronutrientTagsProps = {
  macronutrients: Macronutrients
  className?: string
}

export function MacronutrientTags({
  macronutrients,
  className,
}: MacronutrientTagsProps) {
  const [limit, setLimit] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const { width = 0 } = useResizeObserver<HTMLDivElement>({
    ref: containerRef,
    box: 'border-box',
  })

  const macronutrientsTags = Object.entries(macronutrients)
    .map(([macronutrient, value]) => {
      switch (macronutrient as keyof Macronutrients) {
        case 'carbohydrates':
          return {
            type: MacronutrientTypes.Carbohydrate,
            value,
            order: order.indexOf('carbohydrates'),
          }
        case 'proteins':
          return {
            type: MacronutrientTypes.Protein,
            value,
            order: order.indexOf('proteins'),
          }
        case 'fats':
          return {
            type: MacronutrientTypes.Fat,
            value,
            order: order.indexOf('fats'),
          }
        case 'fibers':
          return {
            type: MacronutrientTypes.Fiber,
            value,
            order: order.indexOf('fibers'),
          }
        case 'sodium':
          return {
            type: MacronutrientTypes.Sodium,
            value,
            order: order.indexOf('sodium'),
          }
        default:
          return null
      }
    })
    .filter(m => m !== null)

  macronutrientsTags.sort((a, b) => a.order - b.order)

  useEffect(() => {
    if (containerRef.current) {
      const dotsWidth = 34 // Espaço reservado para o "+X" indicador
      const flexGap = 8 // Gap entre os itens

      const limit = macronutrientsTags.reduce<[number, number]>(
        (acc, _, index) => {
          const isLastTag = index === macronutrientsTags.length - 1

          const [totalWidth, count] = acc
          const currentElement = containerRef.current?.children[
            index
          ] as HTMLElement
          const currentElementWidth = currentElement.offsetWidth

          const currentTotalWidth = totalWidth + currentElementWidth + flexGap

          if (
            currentTotalWidth + (isLastTag ? 0 : dotsWidth) >
            Math.ceil(width)
          ) {
            return [currentTotalWidth, count]
          }
          return [currentTotalWidth, count + 1]
        },
        [0, 0],
      )
      setLimit(limit[1])
    }
  }, [macronutrientsTags, width])

  const hiddenTags = macronutrientsTags.slice(limit)

  return (
    <div
      ref={containerRef}
      className={cn('w-full relative flex gap-2', className)}
    >
      {macronutrientsTags.map(({ type, value }, index) => (
        <MacronutrientTag
          key={type}
          type={type}
          value={value}
          className={index + 1 > limit ? 'invisible absolute' : ''}
        />
      ))}

      {macronutrientsTags.length > limit && (
        <div className="font-medium text-center border rounded-xl border-violet-300 text-violet-300 pb-0.5 px-1.5 text-xs">
          +{hiddenTags.length}
        </div>
      )}
    </div>
  )
}
