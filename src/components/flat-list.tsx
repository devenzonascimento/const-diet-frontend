import React, { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type FlatListProps<T> = {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string
  onPaginate?: () => void
  hasMore?: boolean
  loader?: React.ReactNode
  className?: string
}

export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  onPaginate,
  hasMore = false,
  loader,
  className,
}: FlatListProps<T>) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      if (entry.isIntersecting && onPaginate && hasMore) {
        onPaginate()
      }
    },
    [onPaginate, hasMore],
  )

  useEffect(() => {
    if (sentinelRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      })
      observerRef.current.observe(sentinelRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [handleObserver])

  return (
    <div className={cn('flex flex-col overflow-auto', className)}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
      ))}
      {hasMore && (
        <div ref={sentinelRef} className="h-4">
          {loader || <span>Loading...</span>}
        </div>
      )}
    </div>
  )
}
