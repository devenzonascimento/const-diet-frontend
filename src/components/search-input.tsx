import React, { useEffect, useState } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

type SearchInputProps = {
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

export const SearchInput = ({ placeholder, value, onChange, onClear }: SearchInputProps) => {
  const [showClearButton, setShowClearButton] = useState(false)

  useEffect(() => {
    const isInputValueEmpty = value === ''

    setShowClearButton(!isInputValueEmpty)
  }, [value])

  return (
    <fieldset className="w-full flex items-center gap-2 p-2 bg-zinc-700 rounded-xl border-2 border-violet-400">
      <SearchIcon className="size-6 text-white" />

      <input
        type="text"
        placeholder={placeholder}
        className="tracking-wide flex-1 text-lg text-white placeholder:text-zinc-400 bg-transparent outline-none"
        value={value}
        onChange={onChange}
      />

      {showClearButton && (
        <button type="button" onClick={onClear}>
          <XIcon className="size-6 text-white" />
        </button>
      )}
    </fieldset>
  )
}
