import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

type ImageProps = {
  src: string
  alt: string
  className?: string
}

const getInitials = (name: string) => {
  const words = name.split(' ')

  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return name.substring(0, 2).toUpperCase()
}

export function Image({ src, alt, className }: ImageProps) {
  const [imageStatus, setImageStatus] = useState<
    'success' | 'loading' | 'error'
  >('loading')

  return (
    <div
      className={cn(
        'aspect-square rounded-full overflow-hidden shrink-0',
        className,
      )}
    >
      {imageStatus === 'loading' && (
        <Skeleton className="size-full bg-zinc-600" />
      )}

      {imageStatus !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setImageStatus('success')}
          onError={() => setImageStatus('error')}
          className="block size-full object-cover"
        />
      )}

      {imageStatus === 'error' && (
        <div className="size-full p-2 flex items-center justify-center bg-zinc-600">
          <span className="text-white text-xl font-bold">
            {getInitials(alt)}
          </span>
        </div>
      )}
    </div>
  )
}
