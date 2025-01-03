import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

import { cva, VariantProps } from 'class-variance-authority'

const imageVariants = cva(
  'aspect-square rounded-full overflow-hidden shrink-0',
  {
    variants: {
      size: {
        small: 'w-8 h-8 text-base',
        medium: 'w-14 h-14 text-xl',
        large: 'w-32 h-32 text-5xl',
        auto: 'w-auto h-auto text-xl',
      },
    },
    defaultVariants: {
      size: 'auto',
    },
  },
)

type ImageProps = {
  src: string
  alt: string
  className?: string
} & VariantProps<typeof imageVariants>

const getInitials = (name: string) => {
  const words = name.split(' ')

  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return name.substring(0, 2).toUpperCase()
}

export function Image({ src, alt, size, className }: ImageProps) {
  const [imageStatus, setImageStatus] = useState<
    'success' | 'loading' | 'error'
  >('loading')

  return (
    <div className={cn(imageVariants({ size, className }))}>
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
        <div className="size-full p-2 flex items-center justify-center text-white font-bold bg-zinc-600">
          {getInitials(alt)}
        </div>
      )}
    </div>
  )
}
