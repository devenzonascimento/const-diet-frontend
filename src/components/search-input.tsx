import { InputHTMLAttributes, forwardRef } from "react";

import { Search } from "lucide-react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ ...props }, ref) => {
    return (
      <fieldset className="relative w-full flex flex-col gap-2" >
        <input
          className=" h-full w-full text-lg py-1 px-4  bg-white rounded-3xl border-2 border-sky-700 placeholder:text-gray-700"
          type="text"
          ref={ref}
          {...props}
        />
        <div className="absolute top-0 right-0 h-full aspect-square flex justify-center items-center bg-sky-700 rounded-full hover:bg-sky-500">
          <Search className="text-white" size={24} />
        </div>
      </fieldset>
    );
  }
);