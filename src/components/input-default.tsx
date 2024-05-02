import { FunctionComponent } from "react";

interface InputDefaultProps {
    id: string
    label: string
}

const InputDefault: FunctionComponent<InputDefaultProps> = ({label}) => {
  return (
    <fieldset className="w-full flex flex-col">
      <label className="font-semibold text-gray-800" htmlFor={`${label}-input`} >
        {label}
      </label>
      <input className="p-1 p bg-transparent border-b border-gray-400" type={label} id={`${label}-input`} />
    </fieldset>
  );
};

export default InputDefault;
