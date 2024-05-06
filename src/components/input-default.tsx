// import { UseFormRegister, FieldValues } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type LabelProps = {
  label: string
}

type  InputDefaultProps = InputProps & LabelProps

import { InputHTMLAttributes, forwardRef } from "react";

const InputDefault = forwardRef<HTMLInputElement, InputDefaultProps>(
  ({ label = "", type = "text", name = "", ...props }, ref) => {
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
      </fieldset>
    );
  }
);

export default InputDefault;
