import { cn } from '@/lib/utils'
import React, { InputHTMLAttributes, forwardRef } from 'react'

type Props = {
  label: string
  errorMessage?: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label = '',
      type = 'text',
      className,
      errorMessage = '',
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <fieldset className="w-full flex flex-col">
        <label htmlFor={props.id} className="pb-1 text-lg text-white">
          {label}
          {required && <span className="pl-0.5 text-error">*</span>}
        </label>

        <input
          className={cn(
            'h-9 w-full py-1 px-2 tracking-wide text-lg text-white placeholder:text-zinc-600 border border-violet-300 focus:border-violet-400 rounded-md outline-none',
            className,
          )}
          type={type}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="text-sm text-error" data-testid="error-message">
            {errorMessage}
          </span>
        )}
      </fieldset>
    )
  },
)

Input.displayName = 'Input'
