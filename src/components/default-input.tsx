import React, { InputHTMLAttributes, forwardRef } from 'react'

type Props = {
  label: string
  errorMessage?: string
}

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  (
    { label = '', type = 'text', errorMessage = '', required, ...props },
    ref,
  ) => {
    return (
      <fieldset className="w-full flex flex-col">
        <div className="">
          <label className="pb-1 text-lg text-white" htmlFor={props.id}>
            {label}
          </label>

          {required && <span className="pl-0.5 text-error">*</span>}
        </div>

        <input
          className="w-full py-1 px-2 tracking-wide text-lg text-white placeholder:text-zinc-600 border border-violet-300 focus:border-violet-400 rounded-md outline-none"
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
