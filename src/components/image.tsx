import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

type ImageProps = {
  src: string
  alt: string
  className?: string
}

export function Image({ src, alt, className }: ImageProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)

  return (
    <div
      className={cn(
        'aspect-square rounded-full overflow-hidden shrink-0',
        className,
      )}
    >
      {isImageLoading && <Skeleton className="size-full bg-zinc-600" />}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsImageLoading(false)}
        className="block size-full object-cover"
      />
    </div>
  )
}
