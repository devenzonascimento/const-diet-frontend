import React, { useState } from 'react'
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

type OptionsDropdownProps = {
  onEdit: () => void
  onDelete: () => void
}

export function OptionsDropdown({ onEdit, onDelete }: OptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleVisibility = () => {
    setIsOpen(isOpen => !isOpen)
  }

  const handleEdit = () => {
    onEdit()
    setIsOpen(false)
  }

  const handleDelete = () => {
    onDelete()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        title="Opções"
        className="size-14 flex items-center justify-center p-3"
        onClick={handleToggleVisibility}
      >
        <EllipsisVerticalIcon className="size-full text-white shrink-0" />
      </button>

      {isOpen && (
        <>
          <div
            className="h-screen w-screen fixed inset-0"
            onClick={handleToggleVisibility}
            onKeyDown={handleToggleVisibility}
          />
          <div className="absolute top-12 right-4 max-w-max flex flex-col gap-1 p-2 bg-zinc-900 rounded-xl">
            <button
              type="button"
              title="Editar alimento"
              className="flex items-center gap-2 p-1 text-white text-xl rounded-lg"
              onClick={handleEdit}
            >
              <PencilIcon />
              Editar
            </button>

            <button
              type="button"
              title="Excluir alimento"
              className="flex items-center gap-2 p-1 text-white text-xl rounded-lg"
              onClick={handleDelete}
            >
              <Trash2Icon />
              Excluir
            </button>
          </div>
        </>
      )}
    </div>
  )
}
