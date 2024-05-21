type LabelProps = {
  label: string
  errorMessage?: string
}

type  InputDefaultProps = InputHTMLAttributes<HTMLInputElement> & LabelProps

import { InputHTMLAttributes, forwardRef } from "react";

const InputDefault = forwardRef<HTMLInputElement, InputDefaultProps>(
  ({ label = "", type = "text", name = "", errorMessage = "", ...props }, ref) => {
    return (
      <fieldset className="w-full flex flex-col">
        <label className="font-semibold text-xl text-gray-800" htmlFor={props.id}>
          {label}
        </label>
        <input
          className="text-lg p-1 p bg-transparent border-b border-gray-400"
          type={type}
          name={name}
          ref={ref}
          {...props}
        />
        <p className="text-sm text-red-500 ">{errorMessage}</p>
      </fieldset>
    );
  }
);

export default InputDefault;
