import React, { forwardRef, TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  errorMessage?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label = '', errorMessage = '', required, ...props }, ref) => {
    return (
      <fieldset className="w-full grid grid-rows-[auto_auto_auto]">
        <div className="">
          <label className="pb-1 text-lg text-white" htmlFor={props.id}>
            {label}
          </label>

          {required && <span className="pl-0.5 text-error">*</span>}
        </div>

        <textarea
          ref={ref}
          className="w-full py-1 px-2 tracking-wide text-lg text-white placeholder:text-zinc-600 border border-violet-300 focus:border-violet-400 rounded-md outline-none"
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

Textarea.displayName = 'Textarea'
