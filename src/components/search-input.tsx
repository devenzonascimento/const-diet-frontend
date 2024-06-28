import { InputHTMLAttributes, forwardRef } from "react";

import { Search } from "lucide-react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ ...props }, ref) => {
    return (
      <fieldset className="relative w-full flex gap-3 px-3 py-2 bg-white rounded-xl border-4 border-sky-700" >
        <Search className=" text-neutral-500" size={28} />
        <input
          className=" h-full w-full text-lg bg-transparent placeholder:text-neutral-400"
          type="text"
          ref={ref}
          {...props}
        />
      </fieldset>
    );
  }
);