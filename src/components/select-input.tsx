import React, { SelectHTMLAttributes, forwardRef } from 'react'

interface Props {
  label: string
  options: {
    text: string
    value: string | number
  }[]
  errorMessage?: string
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & Props

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label = '', options, errorMessage = '', required, ...props }, ref) => {
    return (
      <fieldset className="w-full flex flex-col">
        <div className="">
          <label className="pb-1 text-lg text-white" htmlFor={props.id}>
            {label}
          </label>

          {required && <span className="pl-0.5 text-error">*</span>}
        </div>

        <select
          ref={ref}
          className="w-full py-1 px-2 tracking-wide text-lg text-white placeholder:text-zinc-600 border border-violet-300 focus:border-violet-400 rounded-md outline-none"
          {...props}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              className="bg-zinc-700 text-white"
            >
              {option.text}
            </option>
          ))}
        </select>

        {errorMessage && (
          <span className="text-sm text-error" data-testid="error-message">
            {errorMessage}
          </span>
        )}
      </fieldset>
    )
  },
)
