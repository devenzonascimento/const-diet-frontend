import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'
import { HamIcon } from 'lucide-react'

type ImageProps = {
  src: string
  alt: string
  className?: string
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
        <div className="p-2 bg-zinc-600">
          <HamIcon className="size-full text-white shrink-0" />
        </div>
      )}
    </div>
  )
}
