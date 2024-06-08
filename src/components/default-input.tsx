import { InputHTMLAttributes, forwardRef } from "react";

type Props = {
  label: string
  errorMessage?: string
}

type  DefaultInputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ label = "", type = "text", errorMessage = "", ...props }, ref) => {
    return (
      <fieldset className="w-full flex flex-col gap-2">
        <label className="font-semibold text-lg text-gray-800" htmlFor={props.id}>
          {label}
        </label>
        <input
          className="w-full text-lg py-1 px-2 border rounded-md placeholder:text-gray-700"
          type={type}
          ref={ref}
          {...props}
        />
        <p className="text-sm text-red-500 ">{errorMessage}</p>
      </fieldset>
    );
  }
);
