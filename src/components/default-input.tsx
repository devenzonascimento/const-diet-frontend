import React, { InputHTMLAttributes, forwardRef } from 'react'

type Props = {
  label: string
  errorMessage?: string
}

type DefaultInputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ label = '', type = 'text', errorMessage = '', ...props }, ref) => {
    return (
      <fieldset className="w-full flex flex-col">
        <label
          className="font-semibold text-lg text-sky-950 pb-2"
          htmlFor={props.id}
        >
          {label}
        </label>
        <input
          className="w-full text-lg py-1 px-2 border border-sky-900 rounded-md placeholder:text-gray-400"
          type={type}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <span className="text-sm text-red-500" data-testid="error-message">
            {errorMessage}
          </span>
        )}
      </fieldset>
    )
  },
)
