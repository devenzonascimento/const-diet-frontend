import { SelectHTMLAttributes, forwardRef } from "react";

interface Props {
  label: string;
  options: {
    text: string;
    value: string | number;
  }[]
  errorMessage?: string;
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & Props

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label = "", options, errorMessage = "", ...props }, ref) => {
    return (
      <fieldset className="w-full flex flex-col gap-2">
        <label className="font-semibold text-lg text-sky-950" htmlFor={props.id}>
          {label}
        </label>
        <select
          className="w-full text-lg py-1 px-2 border rounded-md"
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} >{option.text}</option>
          ))}
        </select>
        <p className="text-sm text-red-500 ">{errorMessage}</p>
      </fieldset>
    );
  }
);